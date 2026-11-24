import type { ReactNode } from 'react';
import { PackageSearch } from 'lucide-react';

export function EmptyState({ title, text, action }: { title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="mb-4 grid size-16 place-items-center rounded-full bg-brand-soft text-brand-ink">
        <PackageSearch size={30} />
      </span>
      <h3 className="text-xl font-extrabold">{title}</h3>
      {text && <p className="mt-2 max-w-md text-muted">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
