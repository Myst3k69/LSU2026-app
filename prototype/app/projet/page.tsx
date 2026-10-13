import type { Metadata } from 'next';
import { ProjectView } from '@/screens/views';

export const metadata: Metadata = { title: 'Tableau de bord' };

export default function Page() {
  return <ProjectView />;
}
