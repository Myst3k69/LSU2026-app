'use client';

// Écran Accueil (mobile), porté depuis design-system/components/ScreenHomeMobile/preview.html.
import { useState } from 'react';
import Link from 'next/link';
import { B } from '@/lib/buildos';
import { completenessRules, domainHighlights, domains, homeDraft } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import { detectCompleteness, useCurrentProject } from '@/lib/store';
import { MobileMenu } from '@/components/Mobile';
import { NewProjectDialog } from '@/components/NewProjectDialog';
import './ScreenHomeMobile.css';

// En mobile, les quatre premiers critères tiennent sur une ligne.
const MOBILE_CHIPS = 4;

export default function ScreenHomeMobile() {
  const { project } = useCurrentProject();
  const [description, setDescription] = useState(homeDraft);
  const [naming, setNaming] = useState(false);
  const chips = detectCompleteness(description, completenessRules).slice(0, MOBILE_CHIPS);
  return (
    <div className="s-home-m">
      <B.PrototypeBanner />
      <header className="bar">
        <B.Logo height={24} />
        <div className="bar__r">
          <Link className="user" href={routes.projects} aria-label={`Mes projets (projet actif : ${project.name})`}>{project.founderInitials}</Link>
          <MobileMenu buttonClassName="icbtn" />
        </div>
      </header>
      <section className="hero">
        <span className="disc" aria-hidden="true" />
        <div className="kick label"><i />Nouveau projet · étape 1 sur 2</div>
        <h1 className="display-l">Décrivez votre idée. On en fait un <em>plan.</em></h1>
        <p className="lead">Un plan d’action en huit domaines, avec les étapes que les fondateurs oublient le plus souvent.</p>
      </section>
      <section className="form">
        <B.Input
          label="Votre projet en quelques phrases"
          multiline
          rows={7}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          footer={
            <div className="chips">
              {chips.map((c) => (
                <span key={c.label} className={c.done ? 'chip on' : 'chip'}>
                  {c.done ? <B.Icon name="check" size={14} strokeWidth={2.25} /> : <B.Icon name="plus" size={14} />}
                  {c.short}
                </span>
              ))}
            </div>
          }
        />
        <B.Button variant="primary" size="lg" block icon="arrow-right" onClick={() => setNaming(true)}>
          Générer mon plan
        </B.Button>
        <p className="note body-s">Environ 30 secondes · modifiable ensuite</p>
      </section>
      <section className="doms">
        <div className="doms__h">
          <span className="numeral-s">{String(domains.length).padStart(2, '0')}</span>
          <span className="label">Domaines couverts<br />par votre plan</span>
        </div>
        <ul className="body-s">
          {domains.map((d) => (
            <li key={d.id}>
              <Link href={routes.domain(d.id)}>
                <span className="n">{d.index}</span>
                <span>{d.name}</span>
                {domainHighlights[d.id].some((x) => x.forgotten) ? <B.ForgottenBadge compact className="f" /> : null}
              </Link>
            </li>
          ))}
        </ul>
        <p className="legend body-s">
          <B.ForgottenBadge compact />
          Domaine où les fondateurs oublient souvent une étape
        </p>
      </section>
      <NewProjectDialog open={naming} onClose={() => setNaming(false)} description={description} />
    </div>
  );
}
