import type { SVGProps } from "react";

type DecoProps = SVGProps<SVGSVGElement> & { color?: string };

const deco = { "aria-hidden": true, focusable: false } as const;

export function Star({ color = "#FFD27A", ...props }: DecoProps) {
  return (
    <svg viewBox="0 0 48 48" {...deco} {...props}>
      <path
        fill={color}
        d="M24 3.5c1.3 0 2.4.8 2.9 2l4.3 9.4 10.3 1.2c1.3.2 2.4 1.1 2.7 2.3.4 1.3 0 2.6-1 3.5l-7.6 7 2.1 10.1c.3 1.3-.2 2.6-1.3 3.3-1 .8-2.4.9-3.5.2L24 37.4l-8.9 5.1c-1.1.7-2.5.6-3.5-.2-1.1-.7-1.6-2-1.3-3.3l2.1-10.1-7.6-7c-1-.9-1.4-2.2-1-3.5.3-1.2 1.4-2.1 2.7-2.3l10.3-1.2 4.3-9.4c.5-1.2 1.6-2 2.9-2Z"
      />
    </svg>
  );
}

export function Sparkle({ color = "#8FD3EC", ...props }: DecoProps) {
  return (
    <svg viewBox="0 0 32 32" {...deco} {...props}>
      <path fill={color} d="M16 0c1 8.5 7.5 15 16 16-8.5 1-15 7.5-16 16-1-8.5-7.5-15-16-16C8.5 15 15 8.5 16 0Z" />
    </svg>
  );
}

export function Cloud({ color = "#FFFFFF", ...props }: DecoProps) {
  return (
    <svg viewBox="0 0 120 64" {...deco} {...props}>
      <path
        fill={color}
        d="M30 62h66c12.7 0 23-9.4 23-21s-10.3-21-23-21c-1.3 0-2.6.1-3.9.3C88.3 8.5 77.3 1 64.5 1 50.2 1 38.4 10.4 36 22.8c-2-.5-4-.8-6-.8C16.2 22 5 31 5 42s11.2 20 25 20Z"
      />
    </svg>
  );
}

export function Moon({ color = "#FFE6AE", ...props }: DecoProps) {
  return (
    <svg viewBox="0 0 48 48" {...deco} {...props}>
      <path fill={color} d="M30.5 4A20 20 0 1 0 44 34.6 16.5 16.5 0 0 1 30.5 4Z" />
    </svg>
  );
}

/** Логотип жоқ кезде қолданылатын стандартты белгі */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...deco}>
      <rect width="64" height="64" rx="20" fill="#BDE8F6" />
      <path
        fill="#FFFFFF"
        d="M18 46h28c5.5 0 10-4 10-9s-4.5-9-10-9h-1.6C42.7 22.6 38 19 32.5 19c-6.1 0-11.2 4.4-12.2 10.1-.8-.2-1.6-.3-2.3-.3-4.4 0-8 3.8-8 8.6S13.6 46 18 46Z"
      />
      <path
        fill="#FFD27A"
        d="M44 9.5c.5 0 1 .3 1.2.8l1.7 3.7 4.1.5c.5.1 1 .4 1.1.9.2.5 0 1-.4 1.4l-3 2.8.8 4c.1.5-.1 1-.5 1.3-.4.3-1 .4-1.4.1L44 23l-3.5 2c-.4.3-1 .2-1.4-.1-.4-.3-.6-.8-.5-1.3l.8-4-3-2.8c-.4-.4-.6-.9-.4-1.4.1-.5.6-.8 1.1-.9l4.1-.5 1.7-3.7c.2-.5.7-.8 1.1-.8Z"
      />
    </svg>
  );
}

/** Instagram белгісі (lucide v1-де бренд иконкалары жоқ) */
export function InstagramIcon({ className }: { className?: string; "aria-hidden"?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...deco}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
