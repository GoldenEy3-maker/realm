# 04 — Design System

Статус: Draft v0.11 · Обновлено: 2026-08-08  
Источник правды по визуалу: [`design/realm.pen`](../../design/realm.pen)

Визуальный язык: **Warm paper + Soft green** (атмосфера ближе к мягкому productivity UI: кремовый canvas, stone ink, mint accent). Структура компонентов — shadcn-like (variants / slots), но **не** дефолтный cool-slate / indigo. В коде компоненты пишутся вручную на Radix / Base UI + SCSS Modules (см. [05-tech.md](./05-tech.md)).

**В Pencil уже есть:**

- `01 Foundations` (dark/light) — токены, type, spacing/radius, icons, shell stack
- `02 Components` (dark/light) — UI kit на reusable masters
- `03 Patterns` (dark/light) — task card / kanban / empty
- `04–10`, `12` desktop dark — warm paper shell
- `13 Dashboard V2` (light/dark) — канон Dashboard / Home
- `11 Dashboard` — legacy (не заменён; канон = `13`)
- Mobile `04m–12m` + light twins остальных экранов — **позже**

Themed variables: `mode: dark | light`.

## Принципы

- Light warm paper — primary exploration / product feel; Dark — полноценный twin (**те же имена токенов** в обоих режимах; различаются только values).
- **Warm paper:** кремовый canvas (`$background`), мягкие stone surfaces, текст ink (не pure black/white).
- **Soft green accent:** active rail, timer, selection — `$accent` / `$primary-muted`.
- **CTA:** в light — ink pill (`$primary`); в dark — mint pill (`$primary`). На CTA всегда `$primary-fg`.
- Shell: outer `$background` → rail `$surface` → stage `$panel` → widgets `$card`.
- Крупные радиусы: shell 24, панели 20, cards 16, controls — pill.

### Token semantics (обязательно)

Одинаковые **имена** токенов в light и dark. Не выбирать разные токены «под тему».

| Нужно | Токен | Не делать |
|-------|-------|-----------|
| Обычный текст | `$text` / `$text-muted` / `$text-subtle` | — |
| Фон поверхности | `$background` / `$surface` / `$panel` / `$card` | красить фон через `$text` |
| Инверсный chrome (logo mark, today pill, now pill, tooltip, strong bars) | `$inverse` + `$inverse-fg` | `$text` как fill + `$surface` как текст |
| CTA | `$primary` + `$primary-fg` | — |
| Active rail / soft select | `$primary-muted` + icon `$accent` | — |
| Tag / badge | `$tag-*-bg` + `$tag-*-fg` | — |
| Calendar event chip | `$event-*` + `$event-*-fg` | `$tag-*-fg` / `$success` на event bg |

**Почему `inverse`:** active day и logo раньше брали `$text`/`$surface` «наоборот». Визуально работало из‑за flip значений, но ломало семантику и путало аудит. `inverse` / `inverse-fg` — явные роли.

**Почему `event-*-fg`:** фоны событий themed (pastel в light, deep в dark). Для текста на chip — пара `event-*` + `event-*-fg`, не `tag-*-fg` (у tag другие роли и контраст).

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
inverse chrome    → $inverse + $inverse-fg
```

### Shell layout: зафиксировано

**Global** (Dashboard, Planning, Activity, Chat, Reminders, App Shell empty):

```
[ Rail 64 ] [ Main $panel ]
```

- Icon rail только: глобальные разделы. Без SecondaryNav.
- Chat: список каналов — **screen content** (`ChannelPanel` `$surface`), не глобальный SecondaryNav.
- Dashboard V2 дополнительно: правая utility-колонка (Activity / Projects / Reminders).

**Project** (Overview, Tasks, Wiki, Members, Task Detail):

```
[ Rail 64 ] [ SecondaryNav ~260 ] [ Main $panel ]
```

- SecondaryNav: workspace switcher, search, favorites, дерево projects; под проектом — Overview / Tasks / Wiki / Members.
- Main: **Project header card** (`$card` + `$border`, tabs underline `$accent`) + page body.
- Project nav **не** показывается на Dashboard / Planning / Activity / Chat / Reminders.
- Макеты: `06 Project Overview`, `06b Project Tasks`, `06c Project Wiki`, `06d Project Members`.

### Rail anatomy (spacing)

Смысловые блоки **не** склеивать одним gap:

```
Rail ($surface, pad [16,12], justify space_between)
├── RailTop (vertical, gap 20)     ← отделяет brand от nav
│   ├── Logo (36, $inverse / $inverse-fg)
│   └── Nav (vertical, gap 8)      ← плотный кластер пунктов
└── RailBot (vertical, gap 16)     ← settings отдельно от avatar
    ├── Settings
    └── Avatar
```

## Typography

**Font family:** Inter (UI), JetBrains Mono (таймеры / IDs / shortcuts).  
Токены: `font-sans` / `font-mono`.

**Сетка размеров:** чётные, в основном кратные 4 — `12 · 14 · 16 · 20 · 24 · 28 · 32`.  
Не использовать 11 / 13 / 15 / 18 / 22 как UI sizes (маппинг: 11→12, 13→14, section 16).

Веса: заголовки страниц 700; секции 600; card titles и body-акценты чаще 500–600.

| Token | Size / Weight | Использование |
|-------|---------------|---------------|
| display | 32 / 700 | редкие hero |
| h1 | 24 / 700 | заголовок страницы |
| h2 | 16 / 600 | секции («This week», «Today's tasks», Activity…) |
| h3 | 14 / 600 | заголовки внутри карточек |
| body | 14 / 400 | основной текст |
| body-medium | 14 / 500 | акцентный body |
| small | 12 / 500 | метаданные, day heads, secondary |
| mono | 24 / 600 | крупный timer; 12 для shortcuts |

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
| inverse | `#FAF8F4` | inverted chrome fill |
| inverse-fg | `#1C1917` | on inverse |
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
| inverse | `#1C1917` | inverted chrome fill |
| inverse-fg | `#FAF8F4` | on inverse |
| success | `#047857` | positive |
| warning | `#C2410C` | attention |
| danger | `#B91C1C` | destructive |
| info | `#1D4ED8` | info |

### Tags (оба режима)

`tag-{yellow,green,red,mint,purple,orange,blue}-{bg,fg}` — badge/tag only (не для calendar chips).

### Calendar events (themed pairs)

Одинаковые имена в light/dark; values flip для контраста.

| Token | Dark | Light |
|-------|------|-------|
| event-purple / event-purple-fg | `#4C1D95` / `#EDE4FF` | `#EDE4FF` / `#5B21B6` |
| event-blue / event-blue-fg | `#1E3A5F` / `#DCEBFF` | `#DCEBFF` / `#1D4ED8` |
| event-orange / event-orange-fg | `#7C2D12` / `#FFEDD5` | `#FFEDD5` / `#C2410C` |
| event-green / event-green-fg | `#14532D` / `#D1FAE5` | `#D1FAE5` / `#047857` |
| event-pink / event-pink-fg | `#7F1D1D` / `#FEE2E2` | `#FEE2E2` / `#B91C1C` |

Текст/иконки на chip — только `$event-*-fg`, не `$tag-*-fg`.

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
- **Task timer:** large ring (`$accent`) + mono time; Time-таб показывает Plan (`estimateMinutes`) vs Actual (`TimeEntry`)
- **Today tasks / meetings:** soft rows; active row `$primary-muted`
- **Planning week:** два пояса — **Due band** (task chips по `dueDate` + `~Xh` load, без `+`) над **hour grid** (только `MeetingChip`); today = ink/mint pill
- **Due task chip:** compact pastel chip — title + estimate (`2h`); overdue = тот же chip в своём дне + метка/акцент overdue (без отдельной красной полосы); не растягивается по estimate; не на часовой оси
- **Due empty:** dashed/hairline placeholder «No due» в пустом дне due-полосы (не CTA)
- **MeetingChip:** единственный часовой блок на сетке (`$event-*` / `$event-*-fg`)
- **Activity / Projects / Reminders:** compact utility cards in right column (Dashboard)
- Patterns: TaskCard, Kanban columns, MeetingChip, Due chip, Empty — на warm paper токенах

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
2. **Done (2026-08-08):** type scale 12/14/16; rail anatomy gaps; `inverse` / `event-*-fg`; light/dark token-name sync на shared chrome.
3. **Later:** light twins остальных экранов; mobile `04m–12m`; retire/replace `11 Dashboard`.
4. После правок в Pencil — синхронизировать таблицы в этом файле. После правок здесь — отразить в `design/realm.pen`.
