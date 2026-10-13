'use client';

import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { AppShellProps } from '../../design-system/components/index';
import { B } from '@/lib/buildos';
import { routes } from '@/lib/routes';

// Ordre des liens de navigation rendus par AppShell (Accueil, Mon plan,
// Tableau de bord, Conversations, Documents). Conversations et Documents
// n'ont pas d'écran dans le prototype.
const NAV_TARGETS: (string | null)[] = [routes.home, routes.plan, routes.project, null, null];

/**
 * AppShell du design system, rendu tel quel. Ses liens de navigation sont des
 * href="#" sans prop de routage : on intercepte le clic pour les brancher sur
 * les routes du prototype.
 */
export function Shell(props: AppShellProps) {
  const router = useRouter();

  function onClickCapture(e: MouseEvent<HTMLDivElement>) {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a.bo-side__link');
    if (link) {
      e.preventDefault();
      const links = Array.from(e.currentTarget.querySelectorAll('a.bo-side__link'));
      const href = NAV_TARGETS[links.indexOf(link)];
      if (href) router.push(href);
    }
  }

  return (
    <div style={{ display: 'contents' }} onClickCapture={onClickCapture}>
      <B.AppShell {...props} />
    </div>
  );
}
