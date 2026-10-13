'use client';

// Écran Mes projets (desktop) : pas de maquette dans le design system.
// Page éditoriale dans le style de l'accueil (en-tête, titre manifeste, disque bleu).
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { B } from '@/lib/buildos';
import { SiteHeader } from '@/components/SiteHeader';
import { ProjectCard, ResetDemo } from '@/components/Projects';
import { routes } from '@/lib/routes';
import { useAppState } from '@/lib/store';
import './ScreenProjects.css';

export default function ScreenProjects() {
  const router = useRouter();
  const state = useAppState();
  const n = state.projectOrder.length;
  return (
    <div className="s-projects">
      <B.PrototypeBanner />
      <SiteHeader current="projects" />
      <span className="disc" aria-hidden="true" />
      <section className="intro">
        <div className="kick label"><span className="kick__line" /><span>{n} {n > 1 ? 'projets' : 'projet'}<br />un seul espace</span></div>
        <div className="intro__row">
          <h1 className="display-l">Mes <em>projets.</em></h1>
          <B.Button variant="primary" size="lg" iconLeft="plus" onClick={() => router.push(routes.home)}>Nouveau projet</B.Button>
        </div>
        <p className="body-l lead">Chaque projet garde son plan, ses conversations avec le copilote et ses documents. Passez de l’un à l’autre sans rien perdre.</p>
      </section>
      <section className="grid" aria-label="Vos projets">
        {state.projectOrder.map((id) => (
          <ProjectCard key={id} data={state.projects[id]} current={id === state.currentProjectId} />
        ))}
        <Link className="pm-pnew" href={routes.home}>
          <B.Icon name="plus" size={24} />
          <strong className="title-m">Nouveau projet</strong>
          <span className="body-s">Décrivez votre idée en quelques phrases : BuildOS en fait un plan en huit domaines.</span>
        </Link>
      </section>
      <div className="foot"><ResetDemo /></div>
    </div>
  );
}
