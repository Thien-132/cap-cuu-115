import { LucideIcon } from "lucide-react";

export function InfoCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: LucideIcon;
  title: string;
  lines: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card flex gap-4 items-start">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-sky text-primary-foreground shadow-soft">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="font-semibold">{title}</div>
        {lines.map((l) => (
          <div key={l} className="text-sm text-muted-foreground">
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
