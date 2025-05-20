import type { SVGProps } from 'react';

export function SevakLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 80 Q50 20 80 80" stroke="hsl(var(--primary))" />
      <path d="M30 60 L70 60" stroke="hsl(var(--accent))" />
      <circle cx="50" cy="45" r="5" fill="hsl(var(--primary))" stroke="none"/>
    </svg>
  );
}
