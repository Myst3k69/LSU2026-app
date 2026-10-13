'use client';

import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { AppShellProps } from '../../design-system/components/index';
import { B } from '@/lib/buildos';
import { domains } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import './Shell.css';

// Ordre des liens de navigation rendus par AppShell (Accueil, Mon plan,
// Tableau de bord, Conversations, Documents). Conversations et Documents
// n'ont pas d'écran dans le prototype.
const NAV_TARGETS: (string | null)[] = [routes.home, routes.plan, routes.project, null, null];

/**
 * AppShell du design system, rendu tel quel. Ses liens de navigation sont des
 * href="#" et ses domaines de simples <li>, sans prop de routage : on
 * intercepte clics et clavier pour les brancher sur les routes du prototype.
 */
export function Shell(props: AppShellProps) {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);

  // Rend les domaines de la barre latérale atteignables au clavier.
  useEffect(() => {
    root.current?.querySelectorAll<HTMLLIElement>('li.bo-side__domain').forEach((li, i) => {
      li.setAttribute('role', 'link');
      li.tabIndex = 0;
      li.setAttribute('aria-label', `${domains[i].name} : voir dans le plan`);
    });
  }, []);

  function targetOf(el: HTMLElement, container: HTMLElement): string | null {
    const link = el.closest<HTMLAnchorElement>('a.bo-side__link');
    if (link) {
      const links = Array.from(container.querySelectorAll('a.bo-side__link'));
      return NAV_TARGETS[links.indexOf(link)] ?? null;
    }
    const domain = el.closest<HTMLLIElement>('li.bo-side__domain');
    if (domain) {
      const items = Array.from(container.querySelectorAll('li.bo-side__domain'));
      const d = domains[items.indexOf(domain)];
      return d ? routes.domain(d.id) : null;
    }
    return null;
  }

  function isNavItem(el: HTMLElement) {
    return Boolean(el.closest('a.bo-side__link, li.bo-side__domain'));
  }

  function onClickCapture(e: MouseEvent<HTMLDivElement>) {
    const el = e.target as HTMLElement;
    if (!isNavItem(el)) return;
    e.preventDefault();
    const href = targetOf(el, e.currentTarget);
    if (href) router.push(href);
  }

  function onKeyDownCapture(e: KeyboardEvent<HTMLDivElement>) {
    const el = e.target as HTMLElement;
    if (e.key !== 'Enter' || !el.matches('li.bo-side__domain')) return;
    e.preventDefault();
    const href = targetOf(el, e.currentTarget);
    if (href) router.push(href);
  }

  return (
    <div ref={root} style={{ display: 'contents' }} onClickCapture={onClickCapture} onKeyDownCapture={onKeyDownCapture}>
      <B.AppShell {...props} />
    </div>
  );
}
