import type * as React from 'react';

export type IconName =
  | 'arrow-right' | 'arrow-left' | 'check' | 'circle' | 'check-circle' | 'postpone' | 'alert' | 'sparkle'
  | 'doc' | 'doc-plus' | 'external' | 'send' | 'plus' | 'search' | 'home' | 'list' | 'grid' | 'chat'
  | 'chevron-right' | 'chevron-down' | 'calendar' | 'flag' | 'menu' | 'more'
  | 'cube' | 'users' | 'scale' | 'euro' | 'megaphone' | 'code' | 'sliders' | 'eye';

export type TaskStatusValue = 'todo' | 'done' | 'postponed';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = l'action de l'écran (une seule), ink = action forte secondaire, secondary = contour, ghost = texte. Défaut : primary. */
  variant?: 'primary' | 'ink' | 'secondary' | 'ghost';
  /** sm 32px · md 44px · lg 56px. Défaut : md. */
  size?: 'sm' | 'md' | 'lg';
  /** Icône après le libellé (souvent 'arrow-right'). */
  icon?: IconName;
  /** Icône avant le libellé. */
  iconLeft?: IconName;
  /** Pleine largeur (mobile). */
  block?: boolean;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  /** Étiquette en capitales au-dessus du champ. Sans label, passez aria-label. */
  label?: string;
  /** Aide sous le champ, en ink-3. */
  hint?: string;
  /** Rend une zone de texte (textarea). */
  multiline?: boolean;
  rows?: number;
  /** lg : zone de description de projet (texte body-l, padding space-5). */
  size?: 'md' | 'lg';
  /** Icône à gauche (ex. 'search'). */
  icon?: IconName;
  /** Barre d'outils sous la saisie, dans le cadre (puces, bouton d'envoi). */
  footer?: React.ReactNode;
}
export declare function Input(props: InputProps): React.ReactElement;

export interface TaskStatusProps { status: TaskStatusValue; className?: string }
export declare function TaskStatus(props: TaskStatusProps): React.ReactElement;

export interface ForgottenBadgeProps {
  /** Icône seule (avec title et libellé accessible). */
  compact?: boolean;
  /** Remplace « Souvent oubliée » (ex. « 6 souvent oubliées »). */
  children?: React.ReactNode;
  className?: string;
}
export declare function ForgottenBadge(props: ForgottenBadgeProps): React.ReactElement;

export interface TaskCardProps {
  title: string;
  status?: TaskStatusValue;
  /** Affiche le badge « Souvent oubliée ». */
  forgotten?: boolean;
  /** Nom du domaine en sur-titre (listes transverses : tableau de bord). */
  domain?: string;
  description?: string;
  /** Une info courte : échéance, nombre de ressources, décision. */
  meta?: string;
  selected?: boolean;
  compact?: boolean;
  /** Rend la carte cliquable (bouton). */
  onClick?: () => void;
  className?: string;
}
export declare function TaskCard(props: TaskCardProps): React.ReactElement;

export interface DomainHeaderProps {
  /** Numéro sur deux chiffres : '01' à '08'. */
  index: string;
  name: string;
  icon?: IconName;
  done: number;
  total: number;
  /** Nombre de tâches « souvent oubliées » encore ouvertes. */
  forgotten?: number;
  /** Version mobile : numéro réduit, progression sous le titre. */
  compact?: boolean;
  className?: string;
}
export declare function DomainHeader(props: DomainHeaderProps): React.ReactElement;

export interface ChatBubbleProps {
  from: 'user' | 'ai';
  /** Défaut : « Copilote IA » ou « Vous ». */
  author?: string;
  /** Initiales de l'utilisateur dans l'avatar. */
  initials?: string;
  time?: string;
  /** Boutons d'action sous une réponse du copilote. */
  actions?: { label: string; icon?: IconName }[];
  children?: React.ReactNode;
  className?: string;
}
export declare function ChatBubble(props: ChatBubbleProps): React.ReactElement;

export interface ProgressBarProps { value: number; max?: number; size?: 'md' | 'sm'; tone?: 'bleu' | 'ink'; label?: string; className?: string }
export declare function ProgressBar(props: ProgressBarProps): React.ReactElement;

export interface PrototypeBannerProps { children?: React.ReactNode; className?: string }
export declare function PrototypeBanner(props: PrototypeBannerProps): React.ReactElement;

export interface LogoProps {
  /** full = logotype « BuildOS », icon = monogramme « B. ». */
  variant?: 'full' | 'icon';
  /** color (ink + bleu), ink (monochrome), reverse (sur ink ou bleu). */
  tone?: 'color' | 'ink' | 'reverse';
  /** Hauteur en px. Défaut 28. */
  height?: number;
  className?: string;
}
export declare function Logo(props: LogoProps): React.ReactElement;

export interface IconProps { name: IconName; size?: number; strokeWidth?: number; label?: string; className?: string }
export declare function Icon(props: IconProps): React.ReactElement;

export interface AppShellProps {
  active?: 'home' | 'plan' | 'dashboard' | 'chat' | 'docs';
  /** Domaine mis en avant dans la barre latérale. */
  domain?: string;
  crumbs?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
export declare function AppShell(props: AppShellProps): React.ReactElement;

declare global {
  interface Window {
    BuildOS: {
      Button: typeof Button; Input: typeof Input; TaskCard: typeof TaskCard; ForgottenBadge: typeof ForgottenBadge;
      DomainHeader: typeof DomainHeader; TaskStatus: typeof TaskStatus; ChatBubble: typeof ChatBubble;
      ProgressBar: typeof ProgressBar; PrototypeBanner: typeof PrototypeBanner; Logo: typeof Logo; Icon: typeof Icon;
      AppShell: typeof AppShell;
      /** Données fictives du prototype de vision (projet Créno Vélo). */
      Demo: unknown;
      icons: IconName[];
    };
  }
}
