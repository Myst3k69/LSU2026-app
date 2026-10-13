import type { Metadata } from 'next';
import { ConversationsView } from '@/screens/views';

export const metadata: Metadata = { title: 'Conversations' };

export default function Page() {
  return <ConversationsView />;
}
