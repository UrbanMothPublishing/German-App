import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpenCheck, Home, Settings, Target } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const TABS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/practice", label: "Practice", icon: BookOpenCheck },
  { to: "/mistakes", label: "Mistakes", icon: Target },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

const NO_NAV = ["/welcome", "/exam", "/result", "/unlock"];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const showNav = !NO_NAV.includes(pathname);
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="flex min-h-dvh justify-center bg-backdrop md:items-center md:py-8">
      <div className="relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-background md:h-[880px] md:rounded-[2.75rem] md:border-[10px] md:border-foreground md:shadow-phone">
        <main ref={mainRef} className="no-scrollbar flex-1 overflow-y-auto overscroll-contain">{children}</main>
        {showNav && (
          <nav
            aria-label="Main"
            className="z-20 border-t bg-card/95 px-3 pb-[max(env(safe-area-inset-bottom),0.6rem)] pt-2 backdrop-blur"
          >
            <ul className="grid grid-cols-4 gap-1">
              {TABS.map(({ to, label, icon: Icon }) => {
                const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-2xl py-1.5 text-[11px] font-semibold transition-colors",
                        active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-14 items-center justify-center rounded-full transition-all",
                          active && "bg-secondary",
                        )}
                      >
                        <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                      </span>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
        <div id="sheet-root" className="pointer-events-none absolute inset-0 z-50" />
      </div>
    </div>
  );
}
