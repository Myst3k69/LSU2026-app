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
