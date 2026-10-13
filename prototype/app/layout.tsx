import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../styles/tokens.css';
import '../../design-system/components/bundle.css';

export const metadata: Metadata = {
  title: { default: 'BuildOS · Prototype de vision', template: '%s · BuildOS' },
  description: 'Prototype de vision BuildOS – données fictives (projet Créno Vélo).',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
