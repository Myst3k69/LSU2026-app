import type { Metadata } from 'next';
import { PlanView } from '@/screens/views';

export const metadata: Metadata = { title: 'Plan de lancement' };

export default function Page() {
  return <PlanView />;
}
