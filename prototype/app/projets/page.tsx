import type { Metadata } from 'next';
import { ProjectsView } from '@/screens/views';

export const metadata: Metadata = { title: 'Mes projets' };

export default function Page() {
  return <ProjectsView />;
}
