# 04 — Design System

Статус: Draft v0.6 · Обновлено: 2026-08-04  
Источник правды по визуалу: [`design/realm.pen`](../../design/realm.pen)

Визуальный язык: **shadcn-like структура** + токены Realm в направлении **Cool slate + Layered** (атмосфера ближе к Linear/Raycast, не дефолтный Tailwind). В коде компоненты **не** берутся из `shadcn/ui` — пишутся вручную на Radix / Base UI + SCSS Modules (см. [05-tech.md](./05-tech.md)).

**В Pencil уже есть:** страницы `01 Foundations` (dark/light + layered stack demo), `02 Components` (dark/light), `03 Patterns` (dark/light), десктоп-экраны `04–12` + мобильные аналоги 375px; themed variables `mode: dark|light`; reusable components (Button/*, Input, Badge, Tag, Avatar, Card, Tab/*, RailItem/*, NavItem/*, Checkbox, Switch, Toast, Tooltip, Skeleton, Dialog, Page/TaskDetail, Pattern/TaskCard, Pattern/EmptyState, Pattern/MeetingChip).

## Принципы

- Dark — primary тема; Light — полноценная вторая (те же имена токенов).
- **Cool slate:** холодный сине-серый undertone; текст не pure white, canvas не pure black.
- **Layered chrome:** rail / secondary nav / main различаются тоном; глубина через ступени surface + мягкую тень, не через декоративный шум.
- Карточки, sheets, dialogs — elevated (`$card` + shadow).
- Kanban columns / day wells — мягкий `$surface` (не «дыры» и не тяжёлые панели).
- Радиусы 8–12px; без «пилюль» на крупных контейнерах.
- Акцент — soft indigo (`$primary`), active rail — `$primary-muted` + иконка `$primary` (не solid blue square).
- Semantic + tag colors — только для смысла, слегка desaturated.

### Surfaces: зафиксировано

Выбран **Layered cool slate** (заменяет Flat canvas):

```
rail          → $background (+ right hairline $border)
secondary nav → $surface (+ right hairline $border)
main          → $background
cards/sheets  → $card + soft outer shadow
inputs        → inset: $surface-raised + border; focus ring primary @ ~30%
dialogs/sheets→ $card + stronger shadow; scrim #0B0D12B3
kanban / days → $surface wells, radius-lg
```

## Typography

**Font family:** Inter (UI), JetBrains Mono (код / IDs / shortcuts). Fallback: system-ui / monospace. Совпадает с токенами `font-sans` / `font-mono` в Pencil.

Веса: меньше everywhere-600 — заголовки страниц 600, карточные titles и body-акценты чаще 500.

| Token | Size / Line / Weight | Использование |
|-------|----------------------|---------------|
| display | 32 / 40 / 600 | редкие hero-заголовки |
| h1 | 24 / 32 / 600 | заголовок страницы / проекта |
| h2 | 20 / 28 / 600 | секции |
| h3 | 16 / 24 / 500 | подзаголовки карточек |
| body | 14 / 20 / 400 | основной текст |
| body-medium | 14 / 20 / 500 | акцентный body |
| small | 12 / 16 / 400 | метаданные |
| tiny | 11 / 14 / 500 | badges / counts |
| mono | 12–13 / 16 / 400 | shortcuts, IDs, таймеры |

## Spacing scale

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64` (px)

## Radius scale

| Token | Value |
|-------|-------|
| radius-sm | 6px |
| radius-md | 8px |
| radius-lg | 12px |
| radius-xl | 16px |
| radius-full | 9999px (avatars, dots, timer control) |

## Icons

- Стиль: Lucide, stroke ~1.5–2px
- Размеры: 16 / 20 / 24
- В rail: 20; в инлайне с small text: 16

## Color tokens

Семантические имена (значения — ориентир; финал в Pencil / CSS variables).

### Dark (primary)

| Token | Value | Role |
|-------|-------|------|
| background | `#0B0D12` | canvas / rail / main |
| surface | `#11141B` | secondary nav, column wells |
| surface-raised | `#161B26` | hover, inset inputs |
| card | `#141820` | elevated cards / sheets (мягче к canvas, без «выпрыгивания») |
| border | `#2A3140` | soft hairline |
| border-strong | `#3A4456` | emphasis |
| text | `#E8EAF0` | primary text (не pure white) |
| text-muted | `#9AA3B5` | secondary |
| text-subtle | `#6B7385` | tertiary |
| primary | `#5B7CFF` | CTA / focus / active icon |
| primary-fg | `#FFFFFF` | on primary |
| primary-muted | `#243056` | active rail fill, soft selection |
| success | `#3D9B6E` | done / positive |
| warning | `#D9A441` | medium / attention |
| danger | `#D95A4A` | high / destructive |
| info | `#5B7CFF` | info (aligned with primary family) |

### Light (secondary)

| Token | Value | Role |
|-------|-------|------|
| background | `#F4F6FA` | cool gray canvas |
| surface | `#EEF1F6` | secondary nav / wells |
| surface-raised | `#E6EAF2` | hover / inset |
| card | `#FFFFFF` | elevated cards |
| border | `#D8DEE9` | hairline |
| border-strong | `#C1C9D8` | emphasis |
| text | `#151922` | |
| text-muted | `#5A6478` | |
| text-subtle | `#8B93A7` | |
| primary | `#3D5AFE` | |
| primary-fg | `#FFFFFF` | |
| primary-muted | `#DCE4FF` | active rail / soft selection |
| success / warning / danger / info | чуть глубже для контраста на светлом | |

В light elevation карточек несут **border + тень**. В dark — lighter `$card` **и** мягкая outer shadow.

### Tag palette (оба режима)

Приглушённые slate-tinted bg + контрастный fg: yellow, green, red, mint, purple, orange, blue. Меньше коричневатых/кричащих тонов.

## Elevation

Зафиксированные значения (в Pencil — effect на компонентах; в коде — CSS shadows):

| Surface | Dark | Light |
|---------|------|-------|
| Card | `0 4px 14px rgba(0,0,0,.25)` — мягкая, не «парящая» | `0 1px 2px rgba(15,23,42,.04), 0 8px 24px rgba(15,23,42,.06)` |
| Sheet | `−12px 0 40px rgba(0,0,0,.65)` | аналогично, мягче |
| Dialog | `0 16px 48px rgba(0,0,0,.5)` | `0 16px 48px rgba(15,23,42,.12)` |
| Primary button | soft glow `0 4px 12px rgba(91,124,255,.33)` | чуть слабее |
| Input | inner shadow `0 1px 2px rgba(0,0,0,.25)` | subtle inset |

## Компоненты (визуальный kit)

Обязательный набор в Pencil; в коде — свои обёртки над Radix / Base UI + SCSS Modules в `apps/web` (например `core/ui`):

- Button (default / secondary / ghost / destructive / outline) — primary с soft glow
- Input, Textarea — inset `$surface-raised`
- Badge / Tag
- Avatar (image + fallback initials)
- Card — `$card` + elevation
- Tabs / View switcher
- Sidebar rail item + nav item (active = `$primary-muted` / `$surface-raised`)
- Dropdown menu
- Dialog
- Page (task detail) — контентная страница, не sheet/overlay
- Tooltip / Toast
- Checkbox, Switch
- Skeleton

## Patterns

- **Task card:** labels → title (500) → description snippet → footer; `$card` + soft shadow
- **Project header:** breadcrumb + title + meta row + actions
- **Kanban column:** `$surface` well + title + count badge + add + stack of cards
- **Planning week grid:** единый shell с border; строка Day headers; ось времени слева (`mono`); тело — матрица hour×day с видимыми hairlines (`#6B7385`); today-колонка — `$primary-muted` tint; события — цветные chips (`tag-*` bg/fg) привязанные к hour-ячейке (не «карточки, плавающие в пустой колонке»)
- **Empty / loading / error** — единый визуальный язык
- **Focus timer** *(v1.1)* — крупный круглый play/pause, задача + «Today HH:MM:SS» (`mono`)
- **Meeting chip** *(v1.1)* — время (`mono`) → title; фон `tag-*`, лёгкая тень
- **Reminder row** *(v1.1)* — время → title → priority badge; elevated row
- **Task detail — Time tab** *(v1.1)* — Comments / Activity / Time; timer + Today/This task + History

## Иконки для новых разделов *(v1.1)*

- Dashboard — `layout-dashboard` / `house`
- Reminders — `bell` / `alarm-clock`
- Meeting chip — без иконки типа встречи (см. [02-domain.md](./02-domain.md))

## Реализация в коде

- Токены → CSS custom properties (dark/light), потребляются из SCSS Modules.
- Поведение / a11y → Radix UI или Base UI primitives.
- Внешний вид → вручную по этому документу и Pencil; без Tailwind utility-классов и без копипаста shadcn-компонентов.
- Кастом Realm: cool slate undertone, layered chrome, soft indigo primary, elevation на cards/sheets.

## Синхронизация

После правок в Pencil обновить таблицы токенов в этом файле. После правок здесь — отразить в `design/realm.pen`.
