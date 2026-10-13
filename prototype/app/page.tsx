import type { Metadata } from 'next';
import { HomeView } from '@/screens/views';

export const metadata: Metadata = { title: 'Accueil' };

export default function Page() {
  return <HomeView />;
}
