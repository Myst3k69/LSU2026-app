'use client';

// Écran Mes projets (mobile) : pas de maquette ; en-tête et barre d'onglets du Plan mobile.
import Link from 'next/link';
import { B } from '@/lib/buildos';
import { MobileHeader, TabBar } from '@/components/Mobile';
import { ProjectCard, ResetDemo } from '@/components/Projects';
import { routes } from '@/lib/routes';
import { useAppState } from '@/lib/store';
import '@/components/ui.css';
import './ScreenProjectsMobile.css';

export default function ScreenProjectsMobile() {
  const state = useAppState();
  const n = state.projectOrder.length;
  return (
    <div className="s-projects-m pm-mpage">
      <B.PrototypeBanner />
      <MobileHeader />
      <div className="head">
        <span className="label">{n} {n > 1 ? 'projets' : 'projet'} · un seul espace</span>
        <h1 className="title-xl">Mes projets</h1>
      </div>
      <div className="list">
        {state.projectOrder.map((id) => (
          <ProjectCard key={id} data={state.projects[id]} current={id === state.currentProjectId} />
        ))}
        <Link className="pm-pnew" href={routes.home}>
          <B.Icon name="plus" size={22} />
          <strong className="title-s">Nouveau projet</strong>
          <span className="body-s">Décrivez votre idée : BuildOS en fait un plan.</span>
        </Link>
        <ResetDemo />
      </div>
      <TabBar />
    </div>
  );
}
