export function RealmLogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="6" cy="6" r="1.2" fill="currentColor" />
      <circle cx="18" cy="6" r="1.2" fill="currentColor" />
      <circle cx="6" cy="18" r="1.2" fill="currentColor" />
      <circle cx="18" cy="18" r="1.2" fill="currentColor" />
      <path
        d="M8 8 L6 6 M16 8 L18 6 M8 16 L6 18 M16 16 L18 18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
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
