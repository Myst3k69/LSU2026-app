'use client';

import { useEffect, useId, useState, type FormEvent } from 'react';
import { B } from '@/lib/buildos';
import { domains } from '@/lib/mock-data';
import { addTask } from '@/lib/store';
import type { DomainId } from '@/lib/types';
import { Modal } from './Modal';

interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
  /** Domaine présélectionné (bouton « Ajouter » d'un domaine). */
  defaultDomain?: DomainId;
  onAdded?: (taskId: string, domainId: DomainId) => void;
}

/** Ajout d'une tâche « À faire » au plan du projet courant. */
export function AddTaskDialog({ open, onClose, defaultDomain, onAdded }: AddTaskDialogProps) {
  const formId = useId();
  const [title, setTitle] = useState('');
  const [domainId, setDomainId] = useState<DomainId>(defaultDomain ?? 'produit');
  const [due, setDue] = useState('');
  const [forgotten, setForgotten] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTitle('');
    setDomainId(defaultDomain ?? 'produit');
    setDue('');
    setForgotten(false);
  }, [open, defaultDomain]);

  const valid = title.trim().length >= 3;

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!valid) return;
    const id = addTask({ title, domainId, due: due || undefined, forgotten });
    onClose();
    onAdded?.(id, domainId);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      label="Plan de lancement"
      title="Ajouter une tâche"
      footer={<>
        <B.Button variant="secondary" onClick={onClose}>Annuler</B.Button>
        <B.Button variant="primary" type="submit" form={formId} iconLeft="plus" disabled={!valid}>Ajouter la tâche</B.Button>
      </>}
    >
      <form id={formId} onSubmit={submit} style={{ display: 'contents' }}>
        <B.Input
          label="Intitulé"
          placeholder="Ex. : Rédiger la politique de confidentialité"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          hint="Un verbe à l’infinitif et son objet."
          autoFocus
          required
        />
        <label className="pm-select">
          <span className="label">Domaine</span>
          <select value={domainId} onChange={(e) => setDomainId(e.target.value as DomainId)}>
            {domains.map((d) => <option key={d.id} value={d.id}>{d.index} · {d.name}</option>)}
          </select>
        </label>
        <B.Input label="Échéance (facultative)" type="date" value={due} onChange={(e) => setDue(e.target.value)} />
        <label className="pm-check body-s">
          <input type="checkbox" checked={forgotten} onChange={(e) => setForgotten(e.target.checked)} />
          <span><strong>Étape souvent oubliée.</strong> Elle sera signalée par le badge orange dans le plan.</span>
        </label>
      </form>
    </Modal>
  );
}
