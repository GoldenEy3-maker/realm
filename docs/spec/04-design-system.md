# 04 — Design System

Статус: Draft v0.8 · Обновлено: 2026-08-07  
Источник правды по визуалу: [`design/realm.pen`](../../design/realm.pen)

Визуальный язык: **Warm paper + Soft green** (атмосфера ближе к мягкому productivity UI: кремовый canvas, stone ink, mint accent). Структура компонентов — shadcn-like (variants / slots), но **не** дефолтный cool-slate / indigo. В коде компоненты пишутся вручную на Radix / Base UI + SCSS Modules (см. [05-tech.md](./05-tech.md)).

**В Pencil уже есть:**

- `01 Foundations` (dark/light) — токены, type, spacing/radius, icons, shell stack
- `02 Components` (dark/light) — UI kit на reusable masters
- `03 Patterns` (dark/light) — task card / kanban / empty
- `04–10`, `12` desktop dark — **мигрированы** на warm paper shell
- `13 Dashboard V2` (light/dark) — канон Dashboard / Home
- `11 Dashboard` — legacy (не заменён; канон = `13`)
- Mobile `04m–12m` + light twins остальных экранов — **позже**

Themed variables: `mode: dark | light`.

## Принципы

- Light warm paper — primary exploration / product feel; Dark — полноценный twin (те же имена токенов). Сейчас desktop-экраны (кроме Dashboard V2) — dark-first.
- **Warm paper:** кремовый canvas (`$background`), мягкие stone surfaces, текст ink (не pure black/white).
- **Soft green accent:** active rail, timer, selection — `$accent` / `$primary-muted`, не solid indigo square.
- **CTA:** в light — ink pill (`$primary` = stone black); в dark — mint pill (`$primary` = green).
- Shell: outer `$background` → rail `$surface` → stage `$panel` → widgets `$card`.
- Крупные радиусы: shell 24, панели 20, cards 16, controls — pill.
- Semantic + tag/event colors — только для смысла; calendar chips остаются пастельными в обоих режимах.

### Surfaces: зафиксировано

```
outer shell       → $background  (pad 12, gap 12, radius-2xl)
rail              → $surface     (width 64, radius-xl)
secondary nav     → $surface     (width ~260, radius-xl) — только project-контекст
main stage        → $panel       (radius-xl)
widgets/cards     → $card        (+ hairline $border)
hover / inset     → $surface-raised
dialogs/sheets    → $card + stronger shadow
active / select   → $primary-muted (+ $accent icon/label)
```

### Shell layout: зафиксировано

**Global** (Dashboard, Planning, Activity, Chat, Reminders, App Shell empty):

```
[ Rail 64 ] [ Main $panel ]
```

- Icon rail только: глобальные разделы. Без SecondaryNav.
- Chat: список каналов — **screen content** (`ChannelPanel` `$surface`), не глобальный SecondaryNav.
- Dashboard V2 дополнительно: правая utility-колонка (Activity / Projects / Reminders).

**Project** (Kanban, Task Detail):

```
[ Rail 64 ] [ SecondaryNav ~260 ] [ Main $panel ]
```

- SecondaryNav: workspace switcher, search, favorites, дерево projects.
- Project nav **не** показывается на Dashboard / Planning / Activity / Chat / Reminders.

## Typography

**Font family:** Inter (UI), JetBrains Mono (таймеры / IDs / shortcuts).  
Токены: `font-sans` / `font-mono`.

Веса: заголовки страниц 700; секции 600; card titles и body-акценты чаще 500–600.

| Token | Size / Weight | Использование |
|-------|---------------|---------------|
| display | 32 / 700 | редкие hero |
| h1 | 24 / 700 | заголовок страницы |
| h2 | 18 / 600 | секции («This week») |
| h3 | 14 / 600 | заголовки карточек |
| body | 13 / 400 | основной текст |
| body-medium | 13 / 500 | акцентный body |
| small | 12 / 500 | метаданные |
| tiny | 11 / 600 | badges / priority |
| mono | 22 / 600 | крупный timer; 11–12 для shortcuts |

## Spacing scale

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64` (px)  
Токены: `space-1` … `space-16`.

## Radius scale

| Token | Value | Использование |
|-------|-------|---------------|
| radius-sm | 8 | мелкие controls |
| radius-md | 12 | chips, nav rows |
| radius-lg | 16 | cards, toasts |
| radius-xl | 20 | rail / stage panels |
| radius-2xl | 24 | app shell |
| radius-pill | 999 | buttons, inputs, badges, rail items |

## Icons

- Lucide, stroke ~1.5–2px
- Размеры: 16 / 20 / 24
- Rail: 20; active rail icon → `$accent` на `$primary-muted`
- Section links: label + `chevron-right`

## Color tokens

### Dark

| Token | Value | Role |
|-------|-------|------|
| background | `#14110F` | outer shell |
| surface | `#1C1917` | rail, soft wells |
| surface-raised | `#24201C` | hover / inset |
| panel | `#1A1714` | main stage |
| card | `#221F1C` | widgets |
| border | `#3F3A36` | hairline |
| border-strong | `#57534E` | emphasis |
| text | `#FAF8F4` | primary text |
| text-muted | `#A8A29E` | secondary |
| text-subtle | `#78716C` | tertiary |
| primary | `#4ADE80` | CTA fill (dark) |
| primary-fg | `#14532D` | on CTA |
| primary-muted | `#14532D66` | active / selection |
| accent | `#86EFAC` | active icon / green labels |
| accent-soft | `#4ADE8022` | soft glow rings |
| success | `#6EE7B7` | positive |
| warning | `#FDBA74` | attention |
| danger | `#EF4444` | destructive |
| info | `#93C5FD` | info |

### Light

| Token | Value | Role |
|-------|-------|------|
| background | `#F3EFE8` | outer shell |
| surface | `#FAF8F4` | rail, soft wells |
| surface-raised | `#F5F5F4` | hover / inset |
| panel | `#FFFCFA` | main stage |
| card | `#FFFFFF` | widgets |
| border | `#E7E5E4` | hairline |
| border-strong | `#D6D3D1` | emphasis |
| text | `#1C1917` | primary text |
| text-muted | `#78716C` | secondary |
| text-subtle | `#A8A29E` | tertiary |
| primary | `#1C1917` | CTA fill (light ink) |
| primary-fg | `#FAF8F4` | on CTA |
| primary-muted | `#E7F5EC` | active / selection |
| accent | `#166534` | active icon / green labels |
| accent-soft | `#16653422` | soft glow rings |
| success | `#047857` | positive |
| warning | `#C2410C` | attention |
| danger | `#B91C1C` | destructive |
| info | `#1D4ED8` | info |

### Tags (оба режима)

`tag-{yellow,green,red,mint,purple,orange,blue}-{bg,fg}` — приглушённые pastel bg + контрастный fg.

### Calendar events (shared pastels)

| Token | Value |
|-------|-------|
| event-purple | `#EDE4FF` |
| event-blue | `#DCEBFF` |
| event-orange | `#FFEDD5` |
| event-green | `#D1FAE5` |
| event-pink | `#FEE2E2` |

Event labels берут fg из соответствующего `tag-*-fg` / semantic.

## Elevation

| Surface | Dark | Light |
|---------|------|-------|
| Card | hairline border; optional soft `0 2px 8px rgba(0,0,0,.15)` | hairline + soft shadow |
| Dialog | `0 12px 32px rgba(0,0,0,.4)` | `0 12px 32px rgba(28,25,23,.12)` |
| Primary button | soft outer shadow | soft outer shadow |
| Sheet | stronger side shadow | softer side shadow |

## Компоненты (UI kit)

Reusable masters в Pencil (`02 Components`):

- Button — Primary / Secondary / Outline / Ghost / Destructive (**pill**)
- Input — pill, `$surface` + `$border`
- Badge / Tag — pill
- Avatar — circle
- Card — `$card` + `$radius-lg` + hairline
- Tabs — Active/Idle (pill; active = `$primary` / `$primary-fg`)
- RailItem — Active/Idle (circle; active = `$primary-muted` + `$accent` icon)
- NavItem — Active/Idle
- Checkbox, Switch — `$primary`
- Toast, Tooltip, Skeleton, Dialog

## Patterns

- **Dashboard V2 shell:** rail 64 + main stage + right utility column; gap 12; shell radius 24
- **Global shell:** rail + main `$panel` (без SecondaryNav)
- **Project shell:** rail + SecondaryNav `$surface` + main `$panel`
- **Section link:** title + chevron (ведёт на detail)
- **Task timer:** large ring (`$accent`) + mono time
- **Today tasks / meetings:** soft rows; active row `$primary-muted`
- **Week grid:** day headers; today = ink/mint pill; events = pastel chips
- **Activity / Projects / Reminders:** compact utility cards in right column (Dashboard)
- Patterns: TaskCard, Kanban columns, MeetingChip, Empty — на warm paper токенах

## Иконки разделов

- Dashboard — `layout-dashboard`
- Projects — `folder` / `layers`
- Chat — `message-circle`
- Activity — `zap`
- Reminders — `bell`
- Search — `search`

## Реализация в коде

- Токены → CSS custom properties (dark/light), потребляются из SCSS Modules.
- Поведение / a11y → Radix UI или Base UI primitives.
- Внешний вид → вручную по этому документу и Pencil; без Tailwind utility-классов и без копипаста shadcn-компонентов.
- Кастом Realm: warm paper, soft green accent, pill chrome, layered shell (`background → surface → panel → card`).

## Миграция

1. **Done (desktop dark):** токены, Foundations, Components, `04–10` + `12`, канон Home = `13 Dashboard V2`.
2. **Later:** light twins; mobile `04m–12m`; retire/replace `11 Dashboard`.
3. После правок в Pencil — синхронизировать таблицы в этом файле. После правок здесь — отразить в `design/realm.pen`.
