'use client';

import { useEffect, useId, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { B } from '@/lib/buildos';
import { routes } from '@/lib/routes';
import { createProject, SIMULATED_DELAY_MS } from '@/lib/store';
import { Modal } from './Modal';

const MIN_DESCRIPTION = 40;

/** Étape 2 de l'accueil : nommer le projet, puis générer un plan type (simulé). */
export function NewProjectDialog({ open, onClose, description }: { open: boolean; onClose: () => void; description: string }) {
  const router = useRouter();
  const formId = useId();
  const [name, setName] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (open) {
      setName('');
      setGenerating(false);
    }
  }, [open]);

  const tooShort = description.trim().length < MIN_DESCRIPTION;
  const valid = name.trim().length >= 2 && !tooShort;

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!valid || generating) return;
    setGenerating(true);
    window.setTimeout(() => {
      createProject({ name, description });
      onClose();
      router.push(routes.plan);
    }, SIMULATED_DELAY_MS);
  }

  return (
    <Modal
      open={open}
      onClose={generating ? () => {} : onClose}
      label="Nouveau projet · étape 2 sur 2"
      title="Nommez votre projet."
      footer={<>
        <B.Button variant="secondary" onClick={onClose} disabled={generating}>Retour</B.Button>
        <B.Button variant="primary" type="submit" form={formId} icon="arrow-right" disabled={!valid || generating}>
          {generating ? 'Génération du plan…' : 'Générer mon plan'}
        </B.Button>
      </>}
    >
      <form id={formId} onSubmit={submit} style={{ display: 'contents' }}>
        <B.Input
          label="Nom du projet"
          placeholder="Ex. : Créno Vélo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={generating}
          autoFocus
          required
        />
        {tooShort ? (
          <p className="pm-error body-s">Décrivez votre projet en quelques phrases avant de générer le plan (au moins {MIN_DESCRIPTION} caractères).</p>
        ) : (
          <p className="pm-hint body-s">
            Le plan reprend votre description et couvre les huit domaines, avec les étapes souvent oubliées. Vous pourrez ajouter vos propres tâches ensuite.
          </p>
        )}
        {generating ? (
          <p className="pm-typing body-s" role="status"><B.Icon name="sparkle" size={16} />Le copilote prépare votre plan…</p>
        ) : null}
      </form>
    </Modal>
  );
}
