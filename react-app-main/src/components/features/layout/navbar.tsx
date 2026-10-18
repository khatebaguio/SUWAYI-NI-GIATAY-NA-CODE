import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/use-auth";
import { useFavorites } from "../../../lib/favorites";
import { initialsOf } from "../../../lib/catalog";
import type { IconName } from "../ui/icon";
import { Icon } from "../ui/icon";

interface NavItem {
  label: string;
  to: string;
  icon: IconName;
  end?: boolean;
}

const linkBase =
  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-mist transition hover:bg-rb-800 hover:text-white";
const linkActive = "bg-rb-800 text-white";

export function Navbar() {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = user?.role === "ADMIN";
  const homePath = isAdmin ? "/admin" : "/user";

  const navItems: NavItem[] = [
    { label: "Home", to: homePath, icon: "home", end: true },
    { label: "All Recipes", to: "/recipes", icon: "grid" },
    { label: "Categories", to: "/categories", icon: "tag" },
    { label: "My Favorites", to: "/favorites", icon: "heart" },
  ];

  function closeMenus() {
    setMobileOpen(false);
    setProfileOpen(false);
  }

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    const term = query.trim();
    navigate(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
    closeMenus();
    setSearchOpen(false);
  }

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!profileOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!profileRef.current?.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setProfileOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [profileOpen]);

  async function handleLogout() {
    try {
      await logout();
    } finally {
      closeMenus();
      navigate("/auth/login", { replace: true });
    }
  }

  const displayName = user?.name || user?.email || (user?.role === "ADMIN" ? "Administrator" : "Home cook");

  return (
    <header className="sticky top-0 z-50 border-b border-accent/20 bg-rb-950/95 text-white backdrop-blur supports-[backdrop-filter]:bg-rb-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to={homePath}
            className="shrink-0 font-serif text-xl font-bold tracking-tight text-white"
          >
            Recipe<span className="text-accent">Book.</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {isAdmin
              ? null
              : navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end={item.end}
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `${linkBase} ${isActive ? linkActive : ""}`
                    }
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                    {item.label === "My Favorites" && favorites.length > 0 ? (
                      <span className="ml-1 rounded-full bg-accent/20 px-1.5 py-0.5 text-[0.68rem] font-semibold text-accent-light">
                        {favorites.length}
                      </span>
                    ) : null}
                  </NavLink>
                ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            {searchOpen ? (
              <form onSubmit={submitSearch} className="relative">
                <Icon
                  name="search"
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-mist"
                />
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onBlur={() => {
                    if (!query.trim()) setSearchOpen(false);
                  }}
                  placeholder="Search recipes…"
                  aria-label="Search recipes"
                  className="w-52 rounded-full border border-accent/25 bg-rb-900 py-2 pl-9 pr-3 text-sm text-white placeholder:text-mist/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/25 text-mist transition hover:border-accent hover:text-white"
              >
                <Icon name="search" size={18} />
              </button>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              className="flex items-center gap-2 rounded-full border border-accent/25 py-1 pl-1 pr-2 transition hover:border-accent"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-rb-950">
                {initialsOf(displayName)}
              </span>
              <span className="hidden max-w-28 truncate text-sm font-medium sm:block">
                {displayName}
              </span>
              <Icon name="chevronDown" size={15} className="text-mist" />
            </button>

            {profileOpen ? (
              <div
                role="menu"
                aria-label="Profile"
                className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-accent/25 bg-rb-900 shadow-xl shadow-black/50"
              >
                <div className="border-b border-accent/15 px-4 py-2.5">
                  <p className="truncate text-sm font-semibold text-white">{displayName}</p>
                  <p className="truncate text-xs text-mist">{user?.email}</p>
                  <span className="mt-2 inline-block rounded-full bg-accent/15 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-accent-light">
                    {user?.role === "ADMIN" ? "Administrator" : "Home cook"}
                  </span>
                </div>
                <div className="p-1">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-mist transition hover:bg-rb-800 hover:text-white"
                  >
                    <Icon name="logOut" size={16} />
                    Log Out
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/25 text-white lg:hidden"
          >
            <Icon name={mobileOpen ? "x" : "menu"} size={18} />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-accent/15 bg-rb-950 px-4 pb-5 pt-3 lg:hidden">
          <form onSubmit={submitSearch} className="relative mb-3 md:hidden">
            <Icon
              name="search"
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-mist"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search recipes…"
              aria-label="Search recipes"
              className="w-full rounded-full border border-accent/25 bg-rb-900 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-mist/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </form>

          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {isAdmin
              ? null
              : navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end={item.end}
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `${linkBase} ${isActive ? linkActive : ""}`
                    }
                  >
                    <Icon name={item.icon} size={17} />
                    <span className="flex-1">{item.label}</span>
                    {item.label === "My Favorites" && favorites.length > 0 ? (
                      <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[0.68rem] font-semibold text-accent-light">
                        {favorites.length}
                      </span>
                    ) : null}
                  </NavLink>
                ))}
          </nav>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-accent/15 pt-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-rb-950">
                {initialsOf(displayName)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{displayName}</p>
                <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-accent-light">
                  {user?.role === "ADMIN" ? "Administrator" : "Home cook"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-accent/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-accent hover:text-rb-950"
            >
              <Icon name="logOut" size={15} />
              Log Out
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
