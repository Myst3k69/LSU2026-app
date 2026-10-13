'use client';

// Les composants du design system s'appuient sur window (bundle.js) :
// chaque écran est chargé côté navigateur uniquement.
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/lib/useIsMobile';

const ScreenHome = dynamic(() => import('./ScreenHome'), { ssr: false });
const ScreenHomeMobile = dynamic(() => import('./ScreenHomeMobile'), { ssr: false });
const ScreenPlan = dynamic(() => import('./ScreenPlan'), { ssr: false });
const ScreenPlanMobile = dynamic(() => import('./ScreenPlanMobile'), { ssr: false });
const ScreenTask = dynamic(() => import('./ScreenTask'), { ssr: false });
const ScreenDashboard = dynamic(() => import('./ScreenDashboard'), { ssr: false });
const ScreenConversations = dynamic(() => import('./ScreenConversations'), { ssr: false });
const ScreenConversationsMobile = dynamic(() => import('./ScreenConversationsMobile'), { ssr: false });
const ScreenDocuments = dynamic(() => import('./ScreenDocuments'), { ssr: false });
const ScreenDocumentsMobile = dynamic(() => import('./ScreenDocumentsMobile'), { ssr: false });
const ScreenProjects = dynamic(() => import('./ScreenProjects'), { ssr: false });
const ScreenProjectsMobile = dynamic(() => import('./ScreenProjectsMobile'), { ssr: false });

export function HomeView() {
  return useIsMobile() ? <ScreenHomeMobile /> : <ScreenHome />;
}

export function PlanView() {
  return useIsMobile() ? <ScreenPlanMobile /> : <ScreenPlan />;
}

export function TaskView({ taskId }: { taskId: string }) {
  return <ScreenTask taskId={taskId} />;
}

export function ProjectView() {
  return <ScreenDashboard />;
}

export function ConversationsView({ conversationId }: { conversationId?: string }) {
  return useIsMobile()
    ? <ScreenConversationsMobile selectedId={conversationId} />
    : <ScreenConversations selectedId={conversationId} />;
}

export function DocumentsView() {
  return useIsMobile() ? <ScreenDocumentsMobile /> : <ScreenDocuments />;
}

export function ProjectsView() {
  return useIsMobile() ? <ScreenProjectsMobile /> : <ScreenProjects />;
}
