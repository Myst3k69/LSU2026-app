import type { Metadata } from 'next';
import { findSeedTask, seedTaskIds } from '@/lib/mock-data';
import { TaskView } from '@/screens/views';

type Props = { params: Promise<{ id: string }> };

// Tâches de départ pré-rendues ; celles ajoutées dans le navigateur sont rendues
// à la demande et résolues côté client (« Tâche introuvable » si inconnue).
export function generateStaticParams() {
  return seedTaskIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: findSeedTask(id)?.title ?? 'Tâche' };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <TaskView taskId={id} />;
}
