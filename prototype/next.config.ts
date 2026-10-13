import path from 'node:path';
import type { NextConfig } from 'next';

// Le design system vit à côté du projet (../design-system) : la racine
// Turbopack remonte d'un niveau pour pouvoir en importer les fichiers.
const root = path.resolve(__dirname, '..');

const nextConfig: NextConfig = {
  turbopack: { root },
  outputFileTracingRoot: root,
};

export default nextConfig;
