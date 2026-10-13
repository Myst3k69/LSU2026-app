'use client';

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { AppShellProps } from '../../design-system/components/index';
import { B } from '@/lib/buildos';
import { domains, getStats } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import { startConversation, switchProject, useAppState } from '@/lib/store';
import './Shell.css';
import './ui.css';

// Ordre des liens de navigation rendus par AppShell.
const NAV_TARGETS = [routes.home, routes.plan, routes.project, routes.conversations, routes.documents];
const DOCS_LINK_INDEX = 4;

/** Rend un élément non interactif d'AppShell utilisable au clavier. */
function makeInteractive(el: Element | null | undefined, role: string, label: string) {
  if (!(el instanceof HTMLElement)) return;
  el.setAttribute('role', role);
  el.setAttribute('aria-label', label);
  el.tabIndex = 0;
}

/**
 * AppShell du design system, rendu tel quel. Ses liens sont des href="#", ses
 * domaines, son bloc projet et son champ « Demander au copilote » ne sont pas
 * interactifs, et il n'a aucune prop de routage : on intercepte clics et
 * clavier pour les brancher sur le prototype.
 */
export function Shell(props: AppShellProps) {
  const router = useRouter();
  const state = useAppState();
  const current = state.projects[state.currentProjectId];
  const root = useRef<HTMLDivElement>(null);
  const [switcher, setSwitcher] = useState<{ top: number; left: number } | null>(null);

  // Accessibilité des éléments rendus sans rôle par AppShell.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.querySelectorAll('li.bo-side__domain').forEach((li, i) => makeInteractive(li, 'link', `${domains[i].name} : voir dans le plan`));
    makeInteractive(el.querySelector('.bo-side__project'), 'button', 'Changer de projet');
    makeInteractive(el.querySelector('.bo-topbar__ask'), 'button', 'Demander au copilote');
  }, []);

  // AppShell affiche un nombre de documents fixe (6) : on le remplace par celui du projet.
  useLayoutEffect(() => {
    const count = root.current?.querySelectorAll('a.bo-side__link')[DOCS_LINK_INDEX]?.querySelector('.bo-side__count');
    if (count) count.textContent = String(current.documents.length);
  });

  function openSwitcher(anchor: HTMLElement) {
    const r = anchor.getBoundingClientRect();
    setSwitcher((s) => (s ? null : { top: r.bottom + window.scrollY + 8, left: r.left + window.scrollX }));
  }

  function askCopilot() {
    router.push(routes.conversation(startConversation()));
  }

  /** Destination d'un élément de la barre latérale, ou une action. */
  function activate(el: HTMLElement, container: HTMLElement): boolean {
    const link = el.closest<HTMLAnchorElement>('a.bo-side__link');
    if (link) {
      const href = NAV_TARGETS[Array.from(container.querySelectorAll('a.bo-side__link')).indexOf(link)];
      if (href) router.push(href);
      return true;
    }
    const domain = el.closest<HTMLLIElement>('li.bo-side__domain');
    if (domain) {
      const d = domains[Array.from(container.querySelectorAll('li.bo-side__domain')).indexOf(domain)];
      if (d) router.push(routes.domain(d.id));
      return true;
    }
    const project = el.closest<HTMLElement>('.bo-side__project');
    if (project) {
      openSwitcher(project);
      return true;
    }
    if (el.closest('.bo-topbar__ask')) {
      askCopilot();
      return true;
    }
    return false;
  }

  function onClickCapture(e: MouseEvent<HTMLDivElement>) {
    if (activate(e.target as HTMLElement, e.currentTarget)) e.preventDefault();
  }

  function onKeyDownCapture(e: KeyboardEvent<HTMLDivElement>) {
    const el = e.target as HTMLElement;
    const isCustom = el.matches('li.bo-side__domain, .bo-side__project, .bo-topbar__ask');
    if (isCustom && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      activate(el, e.currentTarget);
    }
  }

  return (
    <div ref={root} style={{ display: 'contents' }} onClickCapture={onClickCapture} onKeyDownCapture={onKeyDownCapture}>
      <B.AppShell {...props} />
      {switcher ? <ProjectSwitcher position={switcher} onClose={() => setSwitcher(null)} /> : null}
    </div>
  );
}

/** Menu de changement de projet, ouvert depuis le bloc projet de la barre latérale. */
function ProjectSwitcher({ position, onClose }: { position: { top: number; left: number }; onClose: () => void }) {
  const state = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.querySelector<HTMLElement>('.is-current')?.focus();
    const onDown = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!ref.current?.contains(target) && !target.closest('.bo-side__project')) onClose();
    };
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div ref={ref} className="pm-pop" style={{ top: position.top, left: position.left }} role="menu" aria-label="Vos projets">
      <span className="pm-pop__label label">Vos projets</span>
      {state.projectOrder.map((id) => {
        const p = state.projects[id];
        const s = getStats(p.tasks);
        const isCurrent = id === state.currentProjectId;
        return (
          <button
            key={id}
            type="button"
            role="menuitemradio"
            aria-checked={isCurrent}
            className={isCurrent ? 'pm-pop__item is-current' : 'pm-pop__item'}
            onClick={() => { switchProject(id); onClose(); }}
          >
            <span className="pm-avatar">{p.project.initial}</span>
            <span className="ui">{p.project.name}<small className="body-s">{s.done}/{s.total} tâches faites</small></span>
            {isCurrent ? <B.Icon name="check" size={18} /> : <span />}
          </button>
        );
      })}
      <div className="pm-pop__sep" />
      <Link className="pm-pop__link ui" href={routes.projects} role="menuitem" onClick={onClose}><B.Icon name="grid" size={18} />Tous mes projets</Link>
      <Link className="pm-pop__link ui" href={routes.home} role="menuitem" onClick={onClose}><B.Icon name="plus" size={18} />Nouveau projet</Link>
    </div>
  );
}
