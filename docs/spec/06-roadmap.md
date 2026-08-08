# 06 — Roadmap

Статус: Draft v0.14 · Обновлено: 2026-08-08

## Фаза 0 — Собирательный образ (сейчас)

**Цель:** ТЗ + дизайн-система + ключевые экраны в Pencil.

- [x] Структура `docs/spec`
- [x] Foundations + components в `design/realm.pen`
- [x] Ревью DS (токены / kit согласованы)
- [x] Экраны dark: Auth (email + code), Shell, Kanban, Task overlay sheet, Planning, Activity, Chat
- [x] **Warm paper + Soft green** — фундамент токенов / Foundations / UI kit; канон Home = `13 Dashboard V2` (см. [04](./04-design-system.md))
- [x] Desktop dark `04–10`, `12` мигрированы на V2 shell (SecondaryNav только на Kanban/Task Detail)
- [x] Mobile 375px рядом с каждым desktop-экраном (ещё cool-slate layout)
- [x] Экран Dashboard V2, Reminders, Focus timer / Meeting chip / Reminder row, Planning с meeting-блоками, Time-таб в Task detail
- [x] Planning model: due-полоса задач + hour grid только для meetings; `estimateMinutes` на Task; overdue accent; scope = моё
- [x] Project workspace IA: Overview (default) · Tasks · Wiki · Members; card-shell header + sidebar mirror; Pencil `06`/`06b`/`06c`/`06d`
- [ ] Light twins desktop-экранов
- [ ] Миграция mobile `04m–12m` на warm paper
- [ ] Retire/replace `11 Dashboard` → `13`
- [ ] Экраны: выбор/создание workspace, Projects list, Settings
- [ ] Kit: Dropdown, Textarea, состояния Checkbox/Switch/Input

**Критерий:** можно открыть ТЗ и `.pen` и понять продукт без кода.

## Фаза 1 — Фундамент продукта

**Цель:** auth, workspace, projects, Overview + tasks (Kanban/List) end-to-end.

Критерии готовности:

- Magic Email login + JWT access/refresh
- Create/select workspace, invite member
- CRUD project + default columns
- Project Overview page (about / outcomes / dates / pulse)
- CRUD tasks, drag between columns, assignees, due date, labels
- Task detail page (не overlay)
- Dark/light theme toggle
- UI kit на Radix/Base UI + SCSS Modules (без Tailwind / shadcn package)

## Фаза 1.1 — Личная продуктивность (v1.1, после ядра)

**Цель:** Dashboard оживает данными; time-tracking, meetings, reminders — см. [01-vision.md](./01-vision.md) и [02-domain.md](./02-domain.md).

- Time-tracking: `TimeEntry`, live-таймер (start/pause/stop) на задаче, один активный на пользователя, Time-таб в Task detail (plan vs actual с `estimateMinutes`)
- Meetings: `Meeting` + attendees, **часовые** блоки на Planning (под due-полосой задач), Dialog просмотра/редактирования, карточка «Today's meetings» на Dashboard
- Reminders: `Reminder`, экран `/reminders` + rail-пункт, виджет на Dashboard
- Dashboard (Home) подключается к реальным данным: Today's tasks/meetings, focus timer, compact Planning preview (due + meetings), Reminders, Recent activity

## Фаза 2 — Контекст и прозрачность

**Цель:** activity + planning minimal; project wiki & members.

- Activity feed по workspace/project
- Planning week: due-полоса + meetings hour grid; drag `dueDate`; `estimateMinutes` на задачах
- Базовые уведомления (in-app)
- Project Wiki (Notion-lite tree + blocks; файлы внутри статей)
- Project Members (`ProjectMembership`: Active / Invited, Invite в проект)

## Фаза 3 — Коммуникация

**Цель:** team chat MVP.

- Workspace channels
- Messages CRUD
- Task comments связанный UX
- Realtime delivery

## Фаза 4 — Углубление

Кандидаты (приоритизация позже):

- Table view, filters saved views
- Attachments storage
- Automations light
- Mobile-friendly layouts
- Billing

## Правила приоритизации

1. Сначала hero-flow: Project Kanban.
2. Не начинать chat realtime до стабильных tasks API.
3. Дизайн-токены меняем централизованно (Pencil → spec → `core/ui` в `apps/web`).
4. Каждая фаза заканчивается демо-сценарием из [01-vision.md](./01-vision.md).

## История изменений спецификации

| Дата | Версия | Что |
|------|--------|-----|
| 2026-08-03 | v0.1 | Первый черновик ТЗ с нуля |
| 2026-08-03 | v0.2 | Tech: SCSS Modules, Radix/Base UI вручную, Clean Architecture, JWT Magic Email; без packages/ui и Tailwind |
| 2026-08-03 | v0.2 | Pencil: экраны Auth, Shell, Kanban, Task detail, Planning, Activity, Chat (dark) |
| 2026-08-03 | v0.2 | Flat canvas surfaces; mobile 375px рядом с desktop; variants A/B/C |
| 2026-08-04 | v0.3 | Синхронизация с ревью: шрифты Inter/JetBrains Mono; card в Light-токенах; убраны ссылки на удалённую страницу Surface Variants; домен — комментарии через канал `type=task`, ProjectFavorite, labels workspace-scope, fractional position, WorkspaceInvite / TaskAttachment / RefreshToken; tech — Zod везде через `packages/shared`, access в памяти + refresh httpOnly cookie, формат ошибок API |
| 2026-08-04 | v0.3 | Зафиксированы: пакетный менеджер **Bun**, ORM **TypeORM** (migrations, без synchronize) |
| 2026-08-04 | v0.4 | Домен: User/Profile split + username; TaskStatus → фиксированный enum (без per-project кастомизации); Chat отделён от задач (TaskComment вернулась как отдельная сущность, ChatChannel без `type`/`taskId`, добавлены pin и ChatAttachment); RefreshToken-таблица заменена на `User.refreshTokenVersion`; ID — bigint auto-increment вместо UUID/ULID |
| 2026-08-04 | v0.5 | User: добавлены presence `status` (online/offline/inactive) и `isArchived` по факту реализованной entity; поле ревокации переименовано `refreshTokenVersion` → `tokenVersion` вслед за кодом; новый инвариант — архивированный пользователь не проходит auth и не назначается |
| 2026-08-04 | v0.6 | Новая фаза v1.1 «Личная продуктивность»: `TimeEntry` (live-таймер, один активный на пользователя), `Meeting` (лёгкий календарный блок, attendees, без RSVP/type), `Reminder` (личная заметка, свой экран + rail); Dashboard (Home) спроектирован полностью — Focus timer / Today's tasks / Today's meetings / compact Planning preview / Reminders / Recent activity, без аналитики/BI; Planning теперь показывает задачи и meetings на одной сетке |
| 2026-08-04 | v0.7 | Pencil v1.1 реализован полностью: экраны Dashboard и Reminders (desktop + mobile), `Pattern/MeetingChip` на Planning (desktop + mobile), rail-пункт Reminders на всех desktop-экранах, третий таб **Time** в `Sheet/TaskDetail` (таймер, Today/This task статы, History); `04-design-system.md` — паттерны Focus timer / Meeting chip / Reminder row / Task detail Time tab |
| 2026-08-04 | v0.8 | Визуальный рефайн **Cool slate + Layered**: новая палитра (soft indigo `#5B7CFF`, `$primary-muted`, мягкий текст), layered chrome (rail → nav `$surface` → cards + shadow), column/day wells `$surface`, elevation на Card/Sheet/Dialog/Button/Input; Flat canvas отменён; foundations + kit + ключевые экраны обновлены |
| 2026-08-07 | v0.9 | Пивот на **Warm paper + Soft green**: новые themed tokens (`panel`, `accent`, pill radii, pastel `event-*`); Foundations + Components UI kit пересобраны; `13 Dashboard V2` light/dark токенизированы; legacy `04–12` не трогали |
| 2026-08-07 | v0.10 | Desktop dark `04–10`+`12` мигрированы на V2 shell: SecondaryNav только на Kanban/Task Detail; Chat channels → ChannelPanel; docs shell rules обновлены |
| 2026-08-08 | v0.11 | Token hygiene: `inverse`/`inverse-fg`, themed `event-*`+`event-*-fg`; type scale 12/14/16; rail Logo∥Nav∥Bot gaps; запрет `$text`/`$surface` flip для chrome |
| 2026-08-08 | v0.12 | Planning: «моя неделя» = due-полоса задач (`dueDate` + `estimateMinutes` + нагрузка дня) + hour grid только для Meetings; без schedule-слотов у Task; overdue accent; done/без due скрыты; спеки 01–04 + Pencil `08`/`08m` |
| 2026-08-08 | v0.13 | Planning UX: убран `+` из due-полосы; убрана overdue-полоса — просрочка остаётся в дне `dueDate`, метка на DueChip; роли пока collaborative (Member CRUD tasks) |
| 2026-08-08 | v0.14 | Project workspace: табы Overview · Tasks · Wiki · Members; Overview default; Wiki Notion-lite + ProjectMembership в домене (build later); Pencil `06`/`06b`/`06c`/`06d`; Phase 1 = Overview+Tasks, Phase 2 = Wiki+Members |
