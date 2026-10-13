'use client';

// Écran Accueil (desktop), porté depuis design-system/components/ScreenHome/preview.html.
// « Générer mon plan » ouvre l'étape 2 (nom du projet) puis crée le projet.
import { useState } from 'react';
import Link from 'next/link';
import { B } from '@/lib/buildos';
import { completenessRules, domainHighlights, domains, homeDraft } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import { detectCompleteness } from '@/lib/store';
import { NewProjectDialog } from '@/components/NewProjectDialog';
import { SiteHeader } from '@/components/SiteHeader';
import './ScreenHome.css';

/** « a », « a et b », « a, b et c ». */
function listFr(items: string[]): string {
  return items.length > 1 ? `${items.slice(0, -1).join(', ')} et ${items[items.length - 1]}` : items[0] ?? '';
}

export default function ScreenHome() {
  const [description, setDescription] = useState(homeDraft);
  const [naming, setNaming] = useState(false);
  const chips = detectCompleteness(description, completenessRules);
  const missing = chips.filter((c) => !c.done).map((c) => `votre ${c.label.toLowerCase()}`);
  return (
    <div className="s-home">
      <B.PrototypeBanner />
      <SiteHeader />
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              footer={
                <div className="chips">
                  {chips.map((c) => (
                    <span key={c.label} className={c.done ? 'chip on' : 'chip'}>
                      {c.done ? <B.Icon name="check" size={14} strokeWidth={2.25} /> : <B.Icon name="plus" size={14} />}
                      {c.label}
                    </span>
                  ))}
                </div>
              }
            />
            <div className="card__go">
              <span className="body-s">
                {missing.length
                  ? `Ajoutez ${listFr(missing)} pour un plan plus précis. Environ 30 secondes.`
                  : 'Votre description est complète. Environ 30 secondes.'}
              </span>
              <B.Button variant="primary" size="lg" icon="arrow-right" onClick={() => setNaming(true)}>
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
          <Link key={d.id} className="dom" href={routes.domain(d.id)}>
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
          </Link>
        ))}
      </section>
      <NewProjectDialog open={naming} onClose={() => setNaming(false)} description={description} />
    </div>
  );
}
