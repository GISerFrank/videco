// src/pages/TripDetailPage.tsx
import React from 'react';
import { InteractiveMap } from '@/components/map/InteractiveMap';

/**
 * 这是新的行程详情页，将作为沉浸式规划视图的主体。
 * 它占据了主内容区域，用于展示一个大的交互式地图。
 */
export const TripDetailPage: React.FC = () => {
    // 这个页面的职责现在非常纯粹：就是渲染地图。
    // 所有的逻辑都已经被封装在 InteractiveMap 和 ItineraryPlannerPanel 组件中了。
    return <InteractiveMap />;
};