// src/router/index.tsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { TripPlannerPage } from "@/pages/TripPlannerPage.tsx";
import { WatchPage } from "@/pages/WatchPage.tsx";
import { TripDetailPage } from '@/pages/TripDetailPage';
import { KnowledgeBasePage } from '@/pages/KnowledgeBasePage';
import { HomePage } from '@/pages/HomePage';
import { FlowPlayerPage } from '@/pages/FlowPlayerPage';
import { FlowSummaryPage } from '@/pages/FlowSummaryPage';
import { PersonalHubPage } from '@/pages/PersonalHubPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'watch/:videoId', element: <WatchPage /> },
            { path: 'trip-planner', element: <TripPlannerPage /> },
            { path: 'trip-planner/:tripId', element: <TripDetailPage /> },
            { path: 'me/knowledge-base', element: <KnowledgeBasePage /> },

            // Phase 1: 个人中心路由
            { path: 'hub', element: <PersonalHubPage /> },
            { path: 'me/hub', element: <PersonalHubPage /> }, // 别名路由
        ],
    },
    {
        path: '/flow',
        element: <FlowPlayerPage />,
    },
    {
        path: '/flow/summary',
        element: <FlowSummaryPage />,
    }
]);

export const AppRouter: React.FC = () => {
    return <RouterProvider router={router} />;
};