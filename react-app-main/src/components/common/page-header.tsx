import { Link } from "react-router-dom";
import { Icon } from "../features/ui/icon";

interface PageHeaderProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  backTo?: string;
  backLabel?: string;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  compact,
  backTo,
  backLabel,
}: PageHeaderProps) {
  if (compact) {
    return (
      <header className="mb-6 flex flex-wrap items-center gap-4 rounded-3xl bg-emerald-950 p-4 text-amber-50 sm:p-5">
        {backTo || backLabel ? (
          <Link
            to={backTo ?? "/user"}
            className="flex items-center gap-1.5 text-sm text-amber-50/90 hover:text-amber-50"
          >
            <Icon name="arrowLeft" size={15} />
            {backLabel ?? "Back"}
          </Link>
        ) : null}
      </header>
    );
  }

  return (
    <header className="admin-banner">
      <div className="admin-banner-content">
        {eyebrow ? <p className="admin-banner-eyebrow">{eyebrow}</p> : null}
        {title ? <h1 className="admin-banner-title">{title}</h1> : null}
        {subtitle ? <p className="admin-banner-subtitle">{subtitle}</p> : null}
      </div>
    </header>
  );
}
