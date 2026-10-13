import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTask, tasks } from '@/lib/mock-data';
import { TaskView } from '@/screens/views';

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return tasks.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: getTask(id)?.title ?? 'Tâche' };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  if (!getTask(id)) notFound();
  return <TaskView taskId={id} />;
}
