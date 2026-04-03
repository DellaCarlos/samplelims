import { Link, useLocation } from "react-router";
import { FlaskConical, TestTubeDiagonalIcon, WheatIcon } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { label: "Samples", href: "/samples" },
  { label: "New Sample", href: "/samples/new" },
];

function AppHeader() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center gap-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-primary"
        >
          <WheatIcon className="h-5 w-5" />
          <span>SampleLims</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                location.pathname === item.href
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
