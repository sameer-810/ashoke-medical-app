import { Link, NavLink, useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { INFO_PAGES } from '../data/info';
import { QuickActions } from '../components/home/QuickActions';
import { NotFoundPage } from './NotFoundPage';
import { cx } from '../lib/format';

export function InfoPage() {
  const { slug = '' } = useParams();
  const page = INFO_PAGES[slug];
  if (!page) return <NotFoundPage />;
  const isFaq = slug === 'faq';

  return (
    <div className="container-page py-6 sm:py-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-subtle">
        <Link to="/" className="hover:text-brand-ink">Home</Link> <span className="mx-1">/</span> <span className="text-ink">{page.title}</span>
      </nav>
      <div className="grid items-start gap-8 lg:grid-cols-[240px_1fr]">
        <nav className="card hidden p-2 lg:block">
          {Object.entries(INFO_PAGES).map(([key, p]) => (
            <NavLink key={key} to={`/info/${key}`}
              className={({ isActive }) => cx('block rounded-lg px-3 py-2.5 font-bold', isActive ? 'bg-brand-soft text-brand-ink' : 'text-muted hover:bg-brand-tint')}>
              {p.title}
            </NavLink>
          ))}
        </nav>
        <article className="max-w-3xl">
          <h1 className="text-2xl font-extrabold sm:text-3xl">{page.title}</h1>
          <p className="mt-3 text-[17px] leading-relaxed text-muted">{page.intro}</p>
          {slug === 'about' && (
            <img src="/images/consultation.jpg" alt="A healthcare professional talking with a customer" width={960} height={640}
              className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover shadow-[0_20px_40px_-24px_rgba(14,27,51,.5)]" />
          )}
          <div className="mt-6 space-y-3">
            {page.sections.map(s => isFaq ? (
              <details key={s.heading} className="card group p-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-extrabold">
                  {s.heading}<ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-4 pb-4 leading-relaxed text-muted">{s.body}</p>
              </details>
            ) : (
              <section key={s.heading}>
                <h2 className="text-lg font-extrabold">{s.heading}</h2>
                <p className="mt-1 leading-relaxed text-muted">{s.body}</p>
              </section>
            ))}
          </div>
          {slug === 'contact' && <QuickActions />}
        </article>
      </div>
    </div>
  );
}
