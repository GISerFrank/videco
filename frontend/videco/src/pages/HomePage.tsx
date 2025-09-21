// src/pages/HomePage.tsx
import React from 'react';
import { useAppStore } from '@/store/appStore';
import { FlowStateSetupModal } from '@/components/modals/FlowStateSetupModal';

// 呼吸式入口组件
const BreathingEntryPoint: React.FC = () => {
    const { openModal } = useAppStore();

    const handleClick = () => {
        openModal(<FlowStateSetupModal />);
    };

    return (
        <div className="absolute bottom-10 right-10 group">
            <button
                onClick={handleClick}
                className="relative w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"
                aria-label="开启心流模式"
            >
                {/* 呼吸光晕效果 */}
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse opacity-75"></div>

                {/* 悬停时出现的文字 */}
                <div className="absolute bottom-full mb-3 w-48 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm rounded-lg py-2 px-3 shadow-md">
                        需要片刻宁静吗？
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45"></div>
                    </div>
                </div>
            </button>
        </div>
    );
};

// 主页组件
export const HomePage: React.FC = () => {
    return (
        <div className="w-full h-full relative">
            <div className="text-center p-10">
                <h1 className="text-4xl font-bold">Welcome to Videco</h1>
                <p className="text-lg text-gray-500 mt-2">探索、创造、连接你的视频宇宙。</p>
            </div>
            <BreathingEntryPoint />
        </div>
    );
};