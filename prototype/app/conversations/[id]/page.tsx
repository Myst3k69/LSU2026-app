import type { Metadata } from 'next';
import { seedProjects } from '@/lib/mock-data';
import { ConversationsView } from '@/screens/views';

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: 'Conversation' };

// Conversations de départ pré-rendues ; celles créées dans le navigateur sont rendues à la demande.
export function generateStaticParams() {
  return seedProjects.flatMap((p) => p.conversations.map((c) => ({ id: c.id })));
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ConversationsView conversationId={id} />;
}
