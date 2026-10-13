'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { B } from '@/lib/buildos';
import './ui.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Étiquette en capitales au-dessus du titre. */
  label?: string;
  footer?: ReactNode;
  wide?: boolean;
  children: ReactNode;
}

/** Fenêtre modale native (<dialog>) : focus piégé, Échap et clic sur le fond la ferment. */
export function Modal({ open, onClose, title, label, footer, wide, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={wide ? 'pm-modal pm-modal--wide' : 'pm-modal'}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
    >
      {open ? (
        <div className="pm-modal__inner">
          <div className="pm-modal__head">
            <div>
              {label ? <span className="label">{label}</span> : null}
              <h2 className="title-l" id={titleId}>{title}</h2>
            </div>
            <button type="button" className="pm-close" aria-label="Fermer" onClick={onClose}>
              <B.Icon name="plus" size={20} />
            </button>
          </div>
          <div className="pm-modal__body">{children}</div>
          {footer ? <div className="pm-modal__foot">{footer}</div> : null}
        </div>
      ) : null}
    </dialog>
  );
}
