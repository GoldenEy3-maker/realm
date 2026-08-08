# 02 — Domain

Статус: Draft v0.8 · Обновлено: 2026-08-08

## Иерархия

```
User
 ├── Profile (1:1 — displayName, avatarUrl)
 ├── WorkspaceMembership (role)
 ├── ProjectFavorite (избранное — per-user)
 └── Reminder (личная заметка — v1.1)

Workspace
 ├── WorkspaceInvite
 ├── TaskLabel (scope: workspace)
 ├── ChatChannel (самостоятельная фича, без привязки к задачам)
 │    └── ChatMessage
 │         └── ChatAttachment (метаданные)
 ├── Meeting (лёгкий календарный блок — v1.1)
 ├── Project
 │    ├── ProjectMembership (later)
 │    ├── WikiPage (later — дерево + blocks)
 │    └── Task (status: enum)
 │         ├── TaskAssignee
 │         ├── TaskComment
 │         ├── TaskAttachment (метаданные)
 │         ├── TimeEntry (v1.1)
 │         └── labels (m2m → TaskLabel)
 └── ActivityEvent
```

**v1.1:** `TimeEntry`, `Meeting`, `Reminder` — спроектированы вместе с v1, но реализуются после ядра (Auth → Workspace → Overview/Tasks), см. [01-vision.md](./01-vision.md).

Модель продукта: **Workspace → Projects → (Overview / Tasks / Wiki / Members)**. Над Workspace в v1 нет Organization.

## Сущности

### User

Только идентификация, auth и учётный статус. Отображаемые данные — в Profile (разделение, чтобы не раздувать auth-сущность и свободно расширять профиль позже).

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| email | string | уникальный, для входа |
| username | string | уникальный, url-safe; используется в `@упоминаниях` (чат, комментарии) и профильных ссылках |
| status | enum | `online` / `offline` / `inactive` — presence-статус (см. ниже) |
| isArchived | bool | default false — деактивированный аккаунт (см. ниже) |
| tokenVersion | int | default 0; см. «Auth: сессии без таблицы токенов» ниже |
| createdAt | datetime | |

**Presence (`status`):** отражает текущее онлайн-состояние пользователя (индикатор в списке участников, чате). `online` — есть активное соединение (WebSocket/недавний heartbeat), `offline` — соединения нет, `inactive` — соединение есть, но нет активности некоторое время (idle/away). Обновляется сервером на connect/disconnect и по heartbeat, не пользователем вручную. Для MVP хранится прямо в Postgres вместе с профилем; при высокой частоте обновлений (много одновременных соединений) можно вынести в Redis как ephemeral-кеш без изменения контракта наружу — `status` как поле пользователя останется, просто источником станет кеш, синкающийся в БД.

**Архивация (`isArchived`):** soft-delete аккаунта — Owner/Admin деактивирует участника (или пользователь сам закрывает аккаунт), без физического удаления данных (сохраняются авторство задач/комментариев/ActivityEvent). Архивированный пользователь: не может пройти auth (`request-code`/`verify` отклоняются), не отображается в списке для нового назначения assignee/invite, но исторические ссылки (`createdById`, `authorId` и т.п.) остаются валидными.

### Profile

1:1 с User. Отображаемые и расширяемые данные (в будущем — bio, timezone и т.п.), без разрастания User.

| Поле | Тип | Описание |
|------|-----|----------|
| userId | id | PK = FK на User |
| displayName | string | отображаемое имя |
| avatarUrl | string? | |
| updatedAt | datetime | |

### Workspace

Логический контейнер команды и всех данных.

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| name | string | |
| slug | string | URL-friendly |
| createdAt | datetime | |

### WorkspaceMembership

| Поле | Тип | Описание |
|------|-----|----------|
| workspaceId | id | |
| userId | id | |
| role | enum | Owner / Admin / Member / Viewer |
| joinedAt | datetime | |

### WorkspaceInvite

Приглашение в workspace (MVP-флоу «Invite»).

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| workspaceId | id | |
| email | string | кому |
| role | enum | назначаемая роль (не Owner) |
| token | string | одноразовый, в ссылке |
| invitedById | id | |
| expiresAt | datetime | |
| acceptedAt | datetime? | null = pending |
| createdAt | datetime | |

**Хранение и чистка:** Postgres, не Redis/JWT-only. В Settings нужен список приглашений (pending/accepted/expired) — то есть их нужно **листать** по workspace, а не только проверять валидность разового токена; Redis TTL здесь не даёт преимуществ, а JWT-only не позволил бы отозвать/показать конкретное приглашение до его принятия. Статус вычисляется на лету: `acceptedAt IS NOT NULL` → accepted, иначе `expiresAt < now()` → expired, иначе pending — отдельного поля-статуса не нужно. Раз в сутки — фоновая job чистит записи старше N дней после `expiresAt`/`acceptedAt` (чисто гигиена таблицы, на логику не влияет).

### Project

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| workspaceId | id | |
| name | string | |
| description | string? | |
| icon / color | string? | визуальный маркер в сайдбаре |
| archivedAt | datetime? | |
| createdAt | datetime | |

**Решено:** избранное — per-user, не флаг на Project (см. ProjectFavorite).

**Project pages (IA):** Overview · Tasks · Wiki · Members. Default landing — Overview. Файлы проекта живут в Wiki (blocks/attachments), отдельного Files-таба нет.

### ProjectFavorite

Избранные проекты пользователя (per-user).

| Поле | Тип | Описание |
|------|-----|----------|
| userId | id | |
| projectId | id | |
| createdAt | datetime | |

### ProjectMembership — design now · build later

Участники **проекта** (подмножество workspace members). Нужны для вкладки Members и Invite в проект; workspace roles остаются вышестоящими.

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| projectId | id | |
| userId | id | должен быть WorkspaceMembership того же workspace |
| role | enum | owner / admin / member (project-scoped; уточняется при реализации) |
| invitedAt | datetime? | null = active member |
| acceptedAt | datetime? | null + invitedAt set = Invited |
| createdAt | datetime | |

**Инвариант:** нельзя принять invite без workspace membership; Owner/Admin workspace могут управлять project membership.

### WikiPage — design now · build later

Страница проектной wiki (Notion-lite: дерево + block body).

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| projectId | id | |
| parentId | id? | дерево страниц; null = root |
| title | string | |
| body | json | block tree: heading / paragraph / list / image / file / embed |
| position | order | порядок среди siblings |
| createdById | id | |
| updatedAt | datetime | |
| createdAt | datetime | |

Файлы — блоки `file` / image URL внутри `body` (или linked TaskAttachment-like metadata later); отдельной Files-сущности в v1 wiki не вводим.

### Reminder — v1.1

Личная заметка-напоминание, **не** связана с Task/Meeting структурно (в отличие от них, это не производное представление, а собственная запись пользователя). Свой экран `/:workspaceSlug/reminders`, плюс виджет на Dashboard.

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| userId | id | |
| workspaceId | id | |
| title | string | |
| remindAt | datetime | |
| priority | enum | переиспользуем enum из Task: none / low / medium / high |
| completedAt | datetime? | null = активно; отметка выполнено/скрыто |
| createdAt | datetime | |

### Task

**Решено:** статусы (колонки Kanban) — фиксированный enum, одинаковый для всех проектов, без отдельной таблицы и без кастомизации в v1 (переименование/добавление/реордер колонок per-project не поддерживается). Проще, быстрее, меньше сущностей. Если позже понадобится кастомизация — осознанная миграция enum → таблица.

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| projectId | id | |
| status | enum | `todo` / `in_progress` / `review` / `done` — колонки Kanban |
| position | fractional | порядок в колонке / списке, отдельный счёт в рамках каждого `status` (см. «Ordering») |
| title | string | |
| description | rich text / markdown (упрощённо) | |
| priority | enum | none / low / medium / high |
| dueDate | date? | день дедлайна (без времени); не schedule-слот |
| estimateMinutes | int? | опциональный план «сколько займёт»; UI как `2h` / `30m` / `1h 30m`; пусто = нет плана |
| createdById | id | |
| createdAt / updatedAt | datetime | |

**Временная модель Task (зафиксировано):**

| Слой | Поле | Смысл |
|------|------|--------|
| Deadline | `dueDate` | к какому **дню** нужно |
| Estimate | `estimateMinutes` | намерение по объёму |
| Log | `TimeEntry` | факт работы |
| Schedule | — | **нет** у задачи (часовые слоты только у `Meeting`) |

Planning показывает задачу в due-полосе дня по `dueDate`, не как блок «с–до» на часовой сетке. Estimate правится в Task detail / на карточке при создании — не с chip на Planning. Сравнение plan vs actual — в Time-табе Task detail.

### TaskAssignee

Many-to-many Task ↔ User (membership должен быть в том же workspace).

### TaskComment

Обсуждение в рамках задачи — отдельно от чата (см. ChatChannel ниже). Создание комментария пишет `comment.created` в ActivityEvent — обсуждение задачи автоматически видно и в общей активности.

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| taskId | id | |
| authorId | id | |
| body | string | |
| createdAt | datetime | |
| editedAt | datetime? | |

### TimeEntry — v1.1

Живой таймер на задаче. Один активный (`endedAt = null`) `TimeEntry` на пользователя одновременно во всём workspace — запуск нового автоматически закрывает предыдущий (`endedAt = now()`). «Сегодня по задаче» / «сегодня всего» считается суммой интервалов за день — без отдельного поля лимита/цели. Сумма интервалов по задаче сравнивается с `Task.estimateMinutes` (если задан) в Time-табе — факт vs план, не расписание.

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| taskId | id | |
| userId | id | |
| startedAt | datetime | |
| endedAt | datetime? | null = таймер сейчас идёт |
| createdAt | datetime | |

**Решено:** не пишет ActivityEvent (иначе каждый start/stop засорял бы общую ленту) — свой блок с историей интервалов внутри Task detail.

### Meeting — v1.1

Лёгкий календарный блок, без RSVP/invite-флоу, без повторов, без интеграции с внешним календарём. **Единственная** сущность с часовым размещением на Planning (`startTime`–`endTime`); задачи живут в due-полосе выше сетки. Также карточка «Today's meetings» на Dashboard.

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| workspaceId | id | |
| projectId | id? | опциональная привязка к проекту |
| title | string | |
| startTime | datetime | |
| endTime | datetime | |
| createdById | id | |
| createdAt | datetime | |

**Attendees:** many-to-many Meeting ↔ User (участники того же workspace) — только отображение, без RSVP-статусов.

**Решено:** без поля `type` (звонок/видео/оффлайн) — визуальная деталь референса без функциональной нагрузки в v1.1. Клик по блоку встречи открывает Dialog для просмотра/редактирования на месте (без отдельного экрана).

### TaskLabel

Цветной тег для категоризации задач — например `Bug`, `Feature`, `Design`, `Urgent`. Отображается бейджем на карточке и используется как фильтр (`Фильтры: assignee, label, priority, due`, см. [03-ia-ux.md](./03-ia-ux.md)). Не путать со статусом: у одной задачи может быть несколько labels одновременно.

**Решено:** scope — workspace-level (переиспользуются между проектами). Связь с задачами — m2m.

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| workspaceId | id | |
| name | string | |
| color | token key | из tag palette DS |

### TaskAttachment

В v1 — только метаданные; хранилище файлов и upload — позже (roadmap Фаза 4).

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| taskId | id | |
| fileName | string | |
| size | int | bytes |
| mimeType | string | |
| uploadedById | id | |
| createdAt | datetime | |

### ChatChannel

**Решено:** чат — самостоятельная фича, независимая от задач. Обсуждение конкретной задачи идёт через комментарии на самой задаче (TaskComment), не через чат-канал; каналы к задачам не привязываются.

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| workspaceId | id | |
| name | string | |
| createdById | id | |
| createdAt | datetime | |

В v1 каналы видны всем участникам workspace (публичные, без приватных/DM — см. открытый вопрос в [01-vision.md](./01-vision.md)).

### ChatMessage

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| channelId | id | |
| authorId | id | |
| body | string | |
| pinnedAt | datetime? | закреплено в канале; null = не закреплено |
| pinnedById | id? | |
| createdAt | datetime | |
| editedAt | datetime? | |

### ChatAttachment

Метаданные вложений к сообщению чата (аналогично TaskAttachment; хранилище файлов и upload — позже, roadmap Фаза 4).

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| messageId | id | |
| fileName | string | |
| size | int | bytes |
| mimeType | string | |
| createdAt | datetime | |

### ActivityEvent

Иммутабельная запись «что произошло».

| Поле | Тип | Описание |
|------|-----|----------|
| id | id | |
| workspaceId | id | |
| projectId | id? | |
| taskId | id? | |
| actorId | id | |
| type | enum | см. ниже |
| payload | json | снимок изменений |
| createdAt | datetime | |

**Типы v1 (минимум):** `project.created`, `task.created`, `task.status_changed`, `task.assignee_changed`, `task.due_changed`, `comment.created`, `member.joined`.

## Auth: сессии без таблицы токенов

**Решено:** без отдельной таблицы RefreshToken. У User — поле `tokenVersion: int` (default 0). Refresh JWT несёт `ver` в payload; на рефреше сверяем с текущим значением у пользователя — несовпадение делает токен невалидным.

- **Обычный logout** — сервер очищает httpOnly refresh-cookie этого устройства; сам refresh JWT остаётся математически валиден до истечения TTL, но клиент им уже не пользуется.
- **«Разлогинить везде» / подозрение на компрометацию / архивация пользователя** — инкремент `tokenVersion`: все ранее выданные refresh JWT сразу становятся невалидны. При `isArchived = true` дополнительно и access, и refresh должны отклоняться на guard-уровне (не дожидаясь истечения access TTL) — проверка `isArchived` идёт при каждом запросе вместе с membership.
- **Осознанный компромисс:** нет списка активных сессий/устройств и нет revoke одной конкретной сессии — доступно только «всё сразу». Это вне скоупа v1 (см. out of scope в [01-vision.md](./01-vision.md)); если появится экран «Active sessions», тогда придётся вернуть таблицу с одной строкой на сессию.
- Этот способ не даёт детектирования повторного использования украденного refresh-токена (reuse attack) — риск ограничивается коротким TTL refresh (7–30 дней) и тем, что access token живёт всего ~15 минут.

Детали потоков и payload — в [05-tech.md](./05-tech.md).

## Ordering (position)

Для drag-and-drop поле `position` у Task — **fractional indexing** (float или lexo-rank строка), отдельный счёт в рамках каждого `status`: вставка между соседями не требует перенумерации колонки. Периодическая нормализация — фоновой задачей / при деградации точности.

## Роли и права (v1)

| Действие | Owner | Admin | Member | Viewer |
|----------|-------|-------|--------|--------|
| Управлять workspace / удалить | ✓ | — | — | — |
| Invite / роли | ✓ | ✓ | — | — |
| CRUD projects | ✓ | ✓ | ✓* | — |
| CRUD tasks | ✓ | ✓ | ✓ | — |
| Комментарии / чат | ✓ | ✓ | ✓ | read |
| Archive project | ✓ | ✓ | — | — |
| CRUD meetings *(v1.1)* | ✓ | ✓ | ✓ | — |
| Time-tracking на себе *(v1.1)* | ✓ | ✓ | ✓ | — |
| Просмотр всего | ✓ | ✓ | ✓ | ✓ |

Reminder — не workspace-ресурс с ролевым доступом, а личная сущность пользователя (виден и редактируется только автором).

\* Member может создавать проекты — да в v1 (можно ужесточить позже).

## Инварианты

1. Task всегда принадлежит ровно одному Project.
2. Project всегда принадлежит ровно одному Workspace.
3. Assignee задачи — только member того же workspace.
4. Перенос задачи между проектами в v1 **не поддерживается** (упрощение).
5. Soft-archive проектов; hard-delete — позже / admin-only.
6. Архивированный (`isArchived = true`) пользователь не проходит auth и не может быть назначен как assignee / приглашён заново; уже существующие ссылки на него (авторство задач, комментариев, ActivityEvent) сохраняются.
7. *(v1.1)* `TimeEntry.userId` и участники `Meeting.attendees` — только members того же workspace, что и Task/Meeting.
8. *(v1.1)* У пользователя не может быть двух `TimeEntry` одновременно с `endedAt = null`.
9. *(later)* `ProjectMembership.userId` и авторы `WikiPage` — только members того же workspace; wiki page принадлежит ровно одному Project.

## Нефункциональные ожидания домена

- **Идентификаторы:** bigint auto-increment (Postgres `bigserial`). Один Postgres-writer — распределённая генерация UUID/ULID не даёт практических преимуществ, а auto-increment проще, компактнее и быстрее по индексам/join'ам. Trade-off — ID предсказуем/перечислим; приемлемо, так как авторизация везде идёт через workspace-membership (см. «Инварианты»), а не через непредсказуемость ID, а наружу (в URL) светится `slug` workspace, не числовой id.
- Время: UTC в хранилище, локаль пользователя в UI.
- Аудит через ActivityEvent, не через мутацию истории сущностей.
