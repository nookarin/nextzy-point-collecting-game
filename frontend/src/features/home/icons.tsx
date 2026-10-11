export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={className}>
      <path d="M4 8.5 7 11l5-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CrownCoinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <circle cx="24" cy="24" r="22" fill="#f5b82e" />
      <circle cx="24" cy="24" r="17" fill="#f8c94e" stroke="#e0a11b" strokeWidth="2" />
      <path d="M14 30 16 18l5 6 3-8 3 8 5-6 2 12Z" fill="#e0a11b" />
    </svg>
  );
}