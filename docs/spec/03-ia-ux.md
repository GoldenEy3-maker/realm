# 03 — IA / UX

Статус: Draft v0.10 · Обновлено: 2026-08-08

Макеты в Pencil ([`design/realm.pen`](../../design/realm.pen)):

- Desktop dark warm paper: `04–10`, `12` (+ Auth); канон Home — `13 Dashboard V2` (light/dark)
- Project workspace: `06 Overview` (default) · `06b Tasks` · `06c Wiki` · `06d Members`
- `11 Dashboard` — legacy (не канон)
- Mobile 375px `04m–12m` — ещё не мигрированы
- Поверхности / shell: **Warm paper + Soft green** (см. [04-design-system.md](./04-design-system.md))
- Ещё без макетов: выбор/создание workspace, Projects list, Settings, `⌘K`

## Информационная архитектура

```
/auth                          Auth
/:workspaceSlug                Redirect → dashboard или last project
/:workspaceSlug/dashboard      Dashboard (Home)
/:workspaceSlug/projects       Список проектов
/:workspaceSlug/projects/:id                 → redirect Overview
/:workspaceSlug/projects/:id/overview        Overview (default)
/:workspaceSlug/projects/:id/tasks           Tasks (Kanban / List / Table)
/:workspaceSlug/projects/:id/wiki            Wiki (design now; build later)
/:workspaceSlug/projects/:id/wiki/:pageId    Wiki article
/:workspaceSlug/projects/:id/members         Members (design now; build later)
/:workspaceSlug/planning       Календарь / неделя (задачи + meetings)
/:workspaceSlug/activity       Лента активности
/:workspaceSlug/reminders      Личные напоминания (v1.1)
/:workspaceSlug/chat           Чат (каналы)
/:workspaceSlug/chat/:channelId
/:workspaceSlug/settings       Настройки workspace / профиля
```

Deep-link URL: `.../projects/:id/tasks/:taskId` — страница Task detail.

## App shell

**Global screens** (Dashboard, Planning, Activity, Chat, Reminders, empty App Shell):

1. **Icon rail** (64) — глобальные разделы  
   Dashboard · Projects · Planning · Activity · Chat · Reminders · (spacer) · Settings · User
2. **Main** (`$panel`) — основной контент  
   Chat: слева внутри контента — `ChannelPanel` (каналы / DM), не глобальный SecondaryNav

**Project screens** (Overview, Tasks, Wiki, Members, Task Detail):

1. **Icon rail** (64)
2. **Secondary nav** (~260, `$surface`) — workspace, search, favorites, дерево projects; под активным проектом — зеркало табов (Overview / Tasks / Wiki / Members); «Create new task» — в контексте Tasks
3. **Main** (`$panel`) — project chrome + page content

**Project chrome (общий):** card-shell шапка (`$card` + border) с табами Overview · Tasks · Wiki · Members, title, description, meta (countdown / dates), team + Invite. Табы дублируют sidebar.

**Task detail** — отдельная страница в project shell (не overlay sheet); вход с Tasks/List/Planning.

Secondary nav на project-экранах можно сворачивать; rail — всегда.

## Экраны v1

### Auth

- Ввод email → код подтверждения → выбор/создание workspace
- Минимальный маркетинг-шум: бренд Realm + форма

### Dashboard (Home)

Landing после входа в workspace. Не аналитика/BI — сводка «что у меня сегодня» (см. принцип в [01-vision.md](./01-vision.md)).

Верхний ряд — 3 карточки:

- **Focus timer** *(v1.1)* — активная задача (если есть `TimeEntry` с `endedAt = null`), play/pause, «Today: HH:MM:SS» суммарно по задаче; без задачи — состояние «выбери задачу»
- **Today's tasks** — мои задачи с `dueDate` = сегодня (assignee = я), список с чекбоксом/приоритетом, ссылка «Manage» → Kanban/List с фильтром
- **Today's meetings** *(v1.1)* — мои встречи на сегодня (attendee = я), время + название, ссылка «View all» → Planning

Центр (основная площадь) — **compact Planning preview**: упрощённая копия экрана Planning (due-полоса задач + часовая сетка meetings), ссылка «Open Planning» — один источник данных, без дублирования фичи.

Правый сайдбар:

- **Reminders** *(v1.1)* — ближайшие личные напоминания (время + приоритет), «+ Add reminder», «Manage» → popover со списком (без перехода на отдельный экран)
- **Recent activity** — короткая лента последних `ActivityEvent` по workspace (список, без графиков/процентов), ссылка «Open Activity»

Аналитика продуктивности (проценты выполнения, донат-чарты по проектам) **намеренно не делаем** — противоречит принципу «не как BI-дашборд».

### Projects list

- Карточки / список проектов
- Favorites сверху
- Создание проекта

### Project workspace

Проект — не только board. Default-таб: **Overview**.

Общий chrome на всех project-страницах: card-shell header + табы **Overview · Tasks · Wiki · Members**.

#### Overview *(Phase 1)*

- About / описание проекта
- Outcomes (чеклист целей)
- Key dates
- Pulse: Due soon · Recent activity · Wiki highlights
- Без BI/метрик/чартов

#### Tasks *(Phase 1)*

- View switcher: **Kanban** (default внутри Tasks) · List · (Table — later / soft)
- Фильтры: assignee, label, priority, due
- Kanban: колонки статусов, drag-and-drop карточек
- Клик по карточке → страница Task detail
- Sidebar: «Create new task»

#### Wiki *(design now · build later)*

- Notion-lite: дерево страниц слева + статья справа
- Блоки: heading, paragraph, list, image, file (вложения живут в wiki, отдельного Files-таба нет)
- Файлы проекта — через wiki blocks / attachments статей

#### Members *(design now · build later)*

- Project-scoped membership (не весь workspace roster)
- Секции: Active · Invited
- Роль на проекте, Invite в проект, search

### Task detail (page)

- Отдельная страница в project shell (rail + secondary nav + main), не overlay/sheet
- Back → проект / предыдущий view
- Title, status, due, assignees, labels, priority
- Description
- Sub-tabs: Comments · Activity · Time *(v1.1)* (по задаче)
- Поле **Estimate** (`estimateMinutes`, опционально) рядом с due / priority — план времени; правится здесь (и при создании), не с Planning chip
- Time-таб *(v1.1)*: start/pause таймера на этой задаче, «сегодня» и история интервалов (`TimeEntry`); если есть estimate — показ plan vs actual
- Attachments (метаданные + upload позже)
- Mobile: full-screen page

### Planning

**Роль:** «моя неделя» — обзор дедлайнов и встреч. Не time-blocking задач, не capacity команды.

**Scope (default):** задачи, где я assignee; meetings *(v1.1)*, где я attendee. Team/person switcher — later.

**Два пояса:**

1. **Due / All-day** (верх) — chips задач по `dueDate` (не привязаны к часу). На chip: title + estimate (`2h`), опционально project/priority. Под днём — мягкая нагрузка `~Xh` = сумма `estimateMinutes` моих не-done задач с due на этот день. Пустой день — placeholder «No due» (без CTA). Создания задачи с Planning **нет** (создание — в Kanban / Task create); полоса без CTA `+`.
2. **Hour grid** (низ) — только **Meetings** *(v1.1)*: видимые линии + zebra по часам; today-колонка подсвечена. Задача никогда не сидит на `14:00`.

**Overdue / done / без due:**

- Overdue (`dueDate < today`, status ≠ done) остаются **в своём дне** по `dueDate` (не притягиваются к today, без отдельной overdue-полосы). На chip — метка/акцент overdue (расширенный chip: title + estimate + статус overdue).
- `done` на Planning **не показываем**.
- Задачи без `dueDate` здесь **не показываем** (живут в Kanban).

**Действия:**

- Клик по задаче → Task detail
- Drag задачи между днями → меняет `dueDate`
- Клик по meeting *(v1.1)* → Dialog просмотра/редактирования на месте
- Create meeting из сетки (click/drag по часам) *(v1.1)*
- Создать задачу / estimate / timer с Planning **не** делаем

Month view + month → week toggle — later.

### Activity

- Вертикальная лента событий workspace
- Фильтр: project, actor, type
- Связь «открыть сущность»

### Chat

Самостоятельная фича, не привязанная к задачам (обсуждение задачи — комментарии в Task detail, см. выше).

- Список каналов в secondary nav
- Основная область: сообщения, вложения, закреплённые сообщения (pin)
- Упоминание задачи в тексте сообщения — просто текстовая ссылка (`@` / `#id`), без структурной связи в данных

### Reminders — v1.1

Полноценный CRUD-экран, свой пункт в rail (виджет на Dashboard — короткая версия того же списка).

- Список личных напоминаний: время, текст, приоритет
- Создание / редактирование / отметка выполнено / удаление
- Только свои — не workspace-ресурс с ролями (см. [02-domain.md](./02-domain.md))

### Settings

- Workspace: name, members, invites, roles
- Profile: username, displayName, avatar, theme (dark/light/system)

## Ключевые user flows

### Onboarding

1. Auth по email-коду
2. Указать username (только для нового пользователя — уникальный, для `@упоминаний`)
3. Создать workspace (name + slug)
4. Invite optional
5. Create first project (с дефолтными колонками)
6. Create first task → Kanban

### Daily work

1. Открыть workspace → Dashboard: что горит сегодня (задачи, встречи, напоминания)
2. Rail → Projects или Favorite в secondary
3. Kanban: переместить / создать / открыть задачу
4. Комментарий в task sheet или сообщение в Chat
5. *(v1.1)* Запустить таймер на задаче с Dashboard или из Task detail

### Planning day/week

1. Rail → Planning (или compact preview на Dashboard)
2. Due-полоса: мои открытые задачи на неделе + нагрузка дня (overdue видны в своём дне с меткой на chip); ниже — мои meetings на часовой сетке *(v1.1)*
3. Drag due / открыть Task detail; клик или create meeting → Dialog *(v1.1)*
4. Fact vs plan — не здесь: Time-таб задачи (таймер + estimate)

## UX-правила

- Пустые состояния всегда с одним CTA.
- Деструктивные действия — confirm dialog.
- Тосты для успешных мутаций; инлайн-ошибки в формах.
- Клавиатура: `⌘K` поиск (заложить в IA), Esc закрывает Dialog / возвращает с Task detail.
- Не перегружать первый экран проекта: шапка + view switcher + board.

## Состояния UI (паттерны)

- Loading skeletons под плотность карточек
- Empty: иллюстрация минимальная или только текст + CTA
- Error: сообщение + retry
- Permission denied: понятный copy для Viewer
