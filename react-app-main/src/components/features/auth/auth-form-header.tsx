interface AuthFormHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
}

export function AuthFormHeader({ eyebrow, title, subtitle }: AuthFormHeaderProps) {
  return (
    <header className="text-center">
      {eyebrow ? <p className="mb-4 text-xs font-medium tracking-widest text-emerald-950/55 uppercase">{eyebrow}</p> : null}
      <h2 className="text-xl font-semibold tracking-tight text-emerald-950">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-emerald-950/65">{subtitle}</p>
    </header>
  );
}
