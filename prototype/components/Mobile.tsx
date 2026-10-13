'use client';

// Navigation mobile partagée : en-tête, menu plein écran et barre d'onglets,
// reprises du Plan mobile du design system (ScreenPlanMobile).
import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { B } from '@/lib/buildos';
import { routes } from '@/lib/routes';
import { useCurrentProject } from '@/lib/store';
import './ui.css';

const MENU = [
  { href: routes.home, label: 'Accueil', icon: 'home' },
  { href: routes.plan, label: 'Mon plan', icon: 'list' },
  { href: routes.project, label: 'Tableau de bord', icon: 'grid' },
  { href: routes.conversations, label: 'Conversations', icon: 'chat' },
  { href: routes.documents, label: 'Documents', icon: 'doc' },
  { href: routes.projects, label: 'Mes projets', icon: 'cube' },
] as const;

function isCurrent(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

/** Bouton « Menu » et menu plein écran vers toutes les rubriques. */
export function MobileMenu({ buttonClassName = 'pm-icbtn' }: { buttonClassName?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { project } = useCurrentProject();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button type="button" className={buttonClassName} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(true)}>
        <B.Icon name="menu" size={20} />
      </button>
      {open ? (
        <div className="pm-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <B.PrototypeBanner />
          <div className="pm-menu__head">
            <B.Logo height={24} />
            <button type="button" className="pm-close" aria-label="Fermer le menu" onClick={() => setOpen(false)} autoFocus>
              <B.Icon name="plus" size={22} />
            </button>
          </div>
          <nav className="title-s" aria-label="Rubriques">
            {MENU.map((m) => (
              <Link key={m.href} href={m.href} aria-current={isCurrent(pathname, m.href) ? 'page' : undefined}>
                <B.Icon name={m.icon} size={20} />{m.label}
              </Link>
            ))}
          </nav>
          <p className="pm-menu__foot body-s">Projet actif : {project.name}</p>
        </div>
      ) : null}
    </>
  );
}

/** En-tête des écrans mobiles de l'application : monogramme, projet actif, actions, menu. */
export function MobileHeader({ actions }: { actions?: ReactNode }) {
  const { project } = useCurrentProject();
  return (
    <header className="pm-mbar">
      <Link href={routes.home} aria-label="Accueil"><B.Logo variant="icon" height={32} /></Link>
      <Link className="pm-mbar__p" href={routes.projects}>
        <span className="label">Projet</span>
        <strong className="ui">{project.name}</strong>
      </Link>
      {actions}
      <MobileMenu />
    </header>
  );
}

const TABS = [
  { id: 'home', href: routes.home, label: 'Accueil', icon: 'home' },
  { id: 'plan', href: routes.plan, label: 'Plan', icon: 'list' },
  { id: 'dashboard', href: routes.project, label: 'Tableau', icon: 'grid' },
  { id: 'chat', href: routes.conversations, label: 'Copilote', icon: 'sparkle' },
] as const;

/** Barre d'onglets fixe en pied d'écran (Plan mobile). */
export function TabBar({ active }: { active?: (typeof TABS)[number]['id'] }) {
  return (
    <nav className="pm-tabbar" aria-label="Navigation">
      {TABS.map((t) => (
        <Link key={t.id} href={t.href} aria-current={active === t.id ? 'page' : undefined}>
          <B.Icon name={t.icon} size={22} />{t.label}
        </Link>
      ))}
    </nav>
  );
}
