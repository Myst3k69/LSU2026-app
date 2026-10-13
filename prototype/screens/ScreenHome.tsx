'use client';

// Écran Accueil (desktop), porté depuis design-system/components/ScreenHome/preview.html.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { B } from '@/lib/buildos';
import { completeness, domainHighlights, domains, project } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import './ScreenHome.css';

export default function ScreenHome() {
  const router = useRouter();
  return (
    <div className="s-home">
      <B.PrototypeBanner />
      <header className="nav">
        <B.Logo height={32} />
        <span className="nav__sep" />
        <span className="nav__tag label">De l’idée<br />au plan d’action</span>
        <nav className="nav__links ui">
          <Link href={routes.project}>Mes projets</Link>
          <a href="#">Méthode</a>
          <a href="#">Ressources</a>
        </nav>
        <div className="nav__right">
          <B.Button variant="secondary" size="sm" iconLeft="list" onClick={() => router.push(routes.plan)}>
            Plan de {project.name}
          </B.Button>
          <span className="nav__user">{project.founderInitials}</span>
        </div>
      </header>
      <section className="hero">
        <div>
          <div className="kick label">
            <span className="kick__line" />
            <span>Nouveau projet<br />Étape 1 sur 2</span>
          </div>
          <h1 className="display-xl">Décrivez votre idée. On en fait un <em>plan.</em></h1>
          <p className="lead body-l">
            BuildOS lit votre description et prépare un plan d’action complet en huit domaines, avec les étapes que les fondateurs oublient le plus souvent.
          </p>
          <div className="proof">
            <B.ForgottenBadge>Étapes souvent oubliées incluses</B.ForgottenBadge>
            <span className="proof__q body-s">Signalées dans le plan dès sa création.</span>
          </div>
        </div>
        <div className="right">
          <div className="card">
            <div className="card__head">
              <span className="label">Votre projet en quelques phrases</span>
              <span className="body-s" style={{ color: 'var(--ink-3)' }}>Brouillon enregistré</span>
            </div>
            <B.Input
              multiline
              size="lg"
              rows={6}
              aria-label="Description du projet"
              defaultValue={project.description}
              footer={
                <div className="chips">
                  {completeness.map((c) => (
                    <span key={c.label} className={c.done ? 'chip on' : 'chip'}>
                      {c.done ? <B.Icon name="check" size={14} strokeWidth={2.25} /> : <B.Icon name="plus" size={14} />}
                      {c.label}
                    </span>
                  ))}
                </div>
              }
            />
            <div className="card__go">
              <span className="body-s">Ajoutez votre budget et votre équipe pour un plan plus précis. Environ 30 secondes.</span>
              <B.Button variant="primary" size="lg" icon="arrow-right" onClick={() => router.push(routes.plan)}>
                Générer mon plan
              </B.Button>
            </div>
          </div>
          <p className="try">
            <span className="label">Ou essayez</span>
            <span className="quote-serif">« Une box de produits fermiers livrée chaque semaine aux salariés de bureaux nantais »</span>
          </p>
        </div>
      </section>
      <span className="disc disc--a" aria-hidden="true" />
      <section className="band">
        <div className="band__intro">
          <span className="numeral">{String(domains.length).padStart(2, '0')}</span>
          <span className="label">Domaines<br />couverts par<br />votre plan</span>
        </div>
        {domains.map((d) => (
          <div key={d.id} className="dom">
            <B.Icon name={d.icon} size={24} />
            <span className="dom__n">{d.index}</span>
            <strong className="title-s">{d.name}</strong>
            <span className="dom__ex body-s">
              {domainHighlights[d.id].map((x, i) => (
                <span key={x.label}>
                  {i > 0 ? ', ' : null}
                  {x.forgotten ? <b>{x.label}</b> : x.label}
                </span>
              ))}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
