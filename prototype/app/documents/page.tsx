import type { Metadata } from 'next';
import { DocumentsView } from '@/screens/views';

export const metadata: Metadata = { title: 'Documents' };

export default function Page() {
  return <DocumentsView />;
}
