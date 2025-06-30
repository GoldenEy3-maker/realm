import { type SVGProps } from "react";

export function RealmLogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Внешний круг - границы Realm */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />

      {/* Внутренний круг - символизирует ядро платформы */}
      <circle
        cx="12"
        cy="12"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Центральная точка - центр управления */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />

      {/* Диагональная структура - символизирует динамику и движение */}
      <circle cx="6" cy="6" r="1.2" fill="currentColor" />
      <circle cx="18" cy="6" r="1.2" fill="currentColor" />
      <circle cx="6" cy="18" r="1.2" fill="currentColor" />
      <circle cx="18" cy="18" r="1.2" fill="currentColor" />

      {/* Диагональные соединительные линии */}
      <path
        d="M8 8 L6 6 M16 8 L18 6 M8 16 L6 18 M16 16 L18 18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Дополнительные внутренние линии для создания сетки */}
      <path
        d="M6 6 L18 18 M18 6 L6 18"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
