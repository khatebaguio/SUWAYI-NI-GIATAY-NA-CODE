import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "search"
  | "clock"
  | "globe"
  | "users"
  | "user"
  | "flame"
  | "plus"
  | "refresh"
  | "trash"
  | "pencil"
  | "arrowLeft"
  | "arrowRight"
  | "image"
  | "book"
  | "x"
  | "logOut"
  | "utensils"
  | "check"
  | "heart"
  | "heartFilled"
  | "home"
  | "grid"
  | "tag"
  | "chevronDown"
  | "menu";

const glyphs: Record<IconName, ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.6-3.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.3 2.5 3.5 5.4 3.5 8.5s-1.2 6-3.5 8.5c-2.3-2.5-3.5-5.4-3.5-8.5s1.2-6 3.5-8.5z" />
    </>
  ),
  users: (
    <>
      <circle cx="9.5" cy="8" r="3.25" />
      <path d="M3.75 19.5a5.75 5.75 0 0 1 11.5 0" />
      <path d="M16.5 5.4a3 3 0 0 1 0 5.2" />
      <path d="M17.6 19.5a5.4 5.4 0 0 0-1.4-3.7 4.6 4.6 0 0 1 4.55 3.7" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.25" r="3.75" />
      <path d="M4.75 20a7.25 7.25 0 0 1 14.5 0" />
    </>
  ),
  flame: (
    <path d="M12 3.2c2.6 3.4 4.6 5.3 4.6 8.6a4.6 4.6 0 0 1-9.2 0c0-1.5.7-2.7 1.8-3.7.3 1.1.9 1.8 1.8 2.2-.2-2.1.3-4.3 1-7.1z" />
  ),
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-13.7-5.3L4 8" />
      <path d="M4 4.5V8h3.5" />
      <path d="M4 13a8 8 0 0 0 13.7 5.3L20 16" />
      <path d="M20 19.5V16h-3.5" />
    </>
  ),
  trash: (
    <>
      <path d="M4.5 7h15" />
      <path d="M9.5 7V4.8h5V7" />
      <path d="M6.5 7l1 12.2h9L17.5 7" />
      <path d="M10.5 11v5M13.5 11v5" />
    </>
  ),
  pencil: (
    <>
      <path d="M4 20h4.2L19 9.2l-4.2-4.2L4 15.8V20z" />
      <path d="M13.8 6l4.2 4.2" />
    </>
  ),
  arrowLeft: <path d="M19 12H5m6 6l-6-6 6-6" />,
  arrowRight: <path d="M5 12h14m-6-6l6 6-6 6" />,
  image: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <circle cx="8.75" cy="10" r="1.5" />
      <path d="M20.5 16.2l-4.8-4.8L6 21" />
    </>
  ),
  book: (
    <>
      <path d="M4 6a2.5 2.5 0 0 1 2.5-2.5H20v13.5H6.5A2.5 2.5 0 0 0 4 19.5V6z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v3.5H6.5" />
    </>
  ),
  x: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  logOut: (
    <>
      <path d="M9.5 20.5H5.8A1.8 1.8 0 0 1 4 18.7V5.3a1.8 1.8 0 0 1 1.8-1.8h3.7" />
      <path d="M15.5 16.5L20 12l-4.5-4.5" />
      <path d="M20 12H9" />
    </>
  ),
  utensils: (
    <>
      <path d="M8 3.5v6a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-6" />
      <path d="M10 11.5V20.5" />
      <path d="M16.5 3.5c1.6 1.1 2.3 2.8 2.3 5.2 0 2-.6 3.4-2.3 4.3V20.5" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  heart: (
    <path d="M12 20s-7-4.35-9.25-8.25A5 5 0 0 1 12 6.3a5 5 0 0 1 9.25 5.45C19 15.65 12 20 12 20z" />
  ),
  heartFilled: (
    <path
      d="M12 20s-7-4.35-9.25-8.25A5 5 0 0 1 12 6.3a5 5 0 0 1 9.25 5.45C19 15.65 12 20 12 20z"
      fill="currentColor"
      stroke="currentColor"
    />
  ),
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 9.5V20h12V9.5" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </>
  ),
  tag: (
    <>
      <path d="M4 12.5V5.5a1.5 1.5 0 0 1 1.5-1.5h7L20 11.5 12.5 19z" />
      <circle cx="8.5" cy="8.5" r="1.25" />
    </>
  ),
  chevronDown: <path d="M6 9.5l6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 16, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyphs[name]}
    </svg>
  );
}
