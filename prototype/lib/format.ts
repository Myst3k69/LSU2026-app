// Libellés de date en français, au format des données fictives (« 13 oct. », « 13 oct., 14:32 »).

export function shortDate(d: Date = new Date()): string {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' }).format(d);
}

export function longDate(d: Date = new Date()): string {
  const s = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(d);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function timeLabel(d: Date = new Date()): string {
  const time = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(d);
  return `${shortDate(d)}, ${time}`;
}

/** « 2026-10-24 » (champ date) → « 24 oct. ». */
export function shortDateFromInput(value: string): string {
  const [y, m, day] = value.split('-').map(Number);
  return shortDate(new Date(y, m - 1, day));
}

/** Supprime accents et majuscules, pour les recherches par mots-clés. */
export function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}
