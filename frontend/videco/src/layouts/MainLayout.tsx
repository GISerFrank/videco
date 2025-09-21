// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAppStore, AppMode } from '@/store/appStore';
import { MainHeader } from '@/components/layout/MainHeader';
import { DefaultSidebar } from '@/components/layout/DefaultSidebar';
import { ItineraryPlannerPanel } from '@/components/panels/ItineraryPlannerPanel';
import { KnowledgeBasePanel } from '@/components/panels/KnowledgeBasePanel';
import { VideoPlayerSidebar } from '@/components/panels/VideoPlayerSidebar';
import { Home } from 'lucide-react';

export const PanelHeader = ({ title }: { title: string }) => (
    <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center flex-shrink-0">
        <Link to="/" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 mr-2" aria-label="返回首页">
            <Home className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <h2 className="font-bold text-lg truncate">{title}</h2>
    </header>
);

export const MainLayout: React.FC = () => {
    const { isRightPanelOpen, rightPanelContent, isModalOpen, modalContent } = useAppStore(); // 1. 获取模态框状态
    const { setAppMode } = useAppStore();
    const location = useLocation();

    const getAppModeForPath = React.useCallback((): AppMode => {
        const path = location.pathname;
        if (path.startsWith('/watch/')) return 'video-consumption';
        if (path.startsWith('/trip-planner')) return 'itinerary-planning';
        if (path.startsWith('/me/knowledge-base')) return 'knowledge-management';
        return 'default';
    }, [location.pathname]);

    const currentMode = getAppModeForPath();

    React.useEffect(() => {
        setAppMode(currentMode);
    }, [currentMode, setAppMode]);

    const renderContextualPanel = () => {
        switch (currentMode) {
            case 'video-consumption': return <VideoPlayerSidebar />;
            case 'itinerary-planning': return <ItineraryPlannerPanel />;
            case 'knowledge-management': return <KnowledgeBasePanel />;
            default: return <DefaultSidebar />;
        }
    };

    return (
        <div className="main-layout flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* 2. 新增全局模态框容器 */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
                    {modalContent}
                </div>
            )}

            <aside className="left-panel w-80 flex-shrink-0 bg-white dark:bg-gray-900 shadow-md z-10 flex flex-col">
                {renderContextualPanel()}
            </aside>

            <div className="main-content-wrapper flex-1 flex flex-col overflow-hidden">
                <MainHeader currentMode={currentMode} />
                <main className="main-content flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>

            <aside
                className={`
                    right-panel flex-shrink-0 bg-white dark:bg-gray-900 shadow-lg z-10 flex flex-col
                    transition-all duration-300 ease-in-out
                    ${isRightPanelOpen ? 'w-80' : 'w-0'}
                `}
            >
                {isRightPanelOpen && rightPanelContent}
            </aside>
        </div>
    );
};