# Realm — Живое ТЗ

Статус: **черновик v0.8** · Тема: dark primary + light secondary · Модель: `Workspace → Projects → Tasks`

Документы ниже — единый источник продуктовой правды. Визуальный источник — [`design/realm.pen`](../../design/realm.pen). Код приложения сюда не подтягиваем как истину: проектируем заново.

## Оглавление

| #   | Документ                               | Содержание                                       | Статус |
| --- | -------------------------------------- | ------------------------------------------------ | ------ |
| 01  | [Vision](./01-vision.md)               | Продукт, аудитория, ценность, границы MVP        | Draft  |
| 02  | [Domain](./02-domain.md)               | Сущности, связи, статусы, роли                   | Draft  |
| 03  | [IA / UX](./03-ia-ux.md)               | Навигация, экраны, user flows                    | Draft  |
| 04  | [Design System](./04-design-system.md) | Токены, типографика, компоненты (зеркало Pencil) | Draft  |
| 05  | [Tech](./05-tech.md)                   | Целевой стек и архитектурные принципы            | Draft  |
| 06  | [Roadmap](./06-roadmap.md)             | Фазы продукта и критерии готовности              | Draft  |

## Как пользоваться

1. Меняешь продукт / домен / UX → правишь соответствующий раздел и дату в шапке файла.
2. Меняешь визуал в Pencil → синхронизируешь [04-design-system.md](./04-design-system.md).
3. Новые решения фиксируй явно (не «в чате»), чтобы можно было вернуться через месяцы.

## Зафиксированные решения

- Платформа управления бизнес-процессами: проекты, задачи, активность, планирование, командный чат.
- Иерархия: **Workspace → Projects → Tasks**.
- UI: shadcn-like визуал (токены Realm); в коде — свои компоненты на Radix/Base UI + SCSS Modules (без shadcn CLI / Tailwind).
- Фронт: Clean Architecture (`app` / `core` / `features` / `shared`); UI внутри `apps/web`.
- Auth: Magic Email + JWT access/refresh (access в памяти, refresh — httpOnly cookie); revoke — через `User.tokenVersion`, без отдельной таблицы токенов.
- Стек-выборы: Bun (package manager), TypeORM (migrations, без synchronize), Zod-схемы в `packages/shared` на обе стороны.
- Шрифты: Inter + JetBrains Mono.
- Поверхности: **Layered cool slate** (rail `$background` → nav `$surface` → cards `$card` + soft shadow); Flat canvas отменён.
- Палитра: cool slate undertone, soft indigo primary (`#5B7CFF` / `#3D5AFE`), `$primary-muted` для active rail; текст не pure white.
- User/Profile разделены (+ уникальный `username` для `@упоминаний`, presence `status`, `isArchived`); TaskStatus — фиксированный enum (без per-project кастомизации); Chat — самостоятельная фича, не привязан к задачам (обсуждение задачи — TaskComment); favorites — per-user; labels — workspace-scope; ID — bigint auto-increment.
- Дизайн: современный, минималистичный с глубиной; dark — основная тема, light — вторая.
- **v1.1 (после ядра):** Time-tracking (`TimeEntry`, live-таймер), Meetings (`Meeting`, лёгкие календарные блоки на Planning), Reminders (`Reminder`, личный экран + rail). Dashboard (Home) спроектирован под них — Focus timer / Today's tasks / Today's meetings / compact Planning preview / Reminders / Recent activity, аналитику/BI намеренно не делаем.
- Дизайн v1.1 полностью в Pencil: экраны Dashboard и Reminders (desktop + mobile), `Pattern/MeetingChip` на Planning, третий таб **Time** в Task detail overlay.

## Связанные артефакты

- Дизайн: `design/realm.pen`
- Референсы (визуальный вайб): Pinterest-скрины kanban/dashboard (dark) + light productivity UIs
