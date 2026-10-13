'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { B } from '@/lib/buildos';
import { routes } from '@/lib/routes';
import { useCurrentProject } from '@/lib/store';
import './SiteHeader.css';

/** En-tête éditorial de l'accueil, partagé avec « Mes projets ». */
export function SiteHeader({ current }: { current?: 'projects' }) {
  const router = useRouter();
  const { project } = useCurrentProject();
  return (
    <header className="pm-nav">
      <Link href={routes.home} aria-label="Accueil"><B.Logo height={32} /></Link>
      <span className="pm-nav__sep" />
      <span className="pm-nav__tag label">De l’idée<br />au plan d’action</span>
      <nav className="pm-nav__links ui">
        <Link href={routes.projects} aria-current={current === 'projects' ? 'page' : undefined}>Mes projets</Link>
        <a href="#">Méthode</a>
        <a href="#">Ressources</a>
      </nav>
      <div className="pm-nav__right">
        <B.Button variant="secondary" size="sm" iconLeft="list" onClick={() => router.push(routes.plan)}>
          Plan de {project.name}
        </B.Button>
        <span className="pm-nav__user">{project.founderInitials}</span>
      </div>
    </header>
  );
}
