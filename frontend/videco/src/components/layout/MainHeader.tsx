// src/components/layout/MainHeader.tsx
import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import { AppMode, useAppStore } from '@/store/appStore';
import { FlowStateSetupModal } from '@/components/modals/FlowStateSetupModal';

interface MainHeaderProps {
    currentMode: AppMode;
}

const magicKeywords = ['放松', '治愈', '专注', '学习', '累', '助眠', '灵感', 'bgm'];

export const MainHeader: React.FC<MainHeaderProps> = ({ currentMode }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { openModal } = useAppStore();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchTerm(query);

        // 检查是否包含魔法关键词
        const isMagic = magicKeywords.some(keyword => query.includes(keyword));
        if (isMagic) {
            openModal(<FlowStateSetupModal />);
            // 可以选择性地清空搜索框或保留内容
            setSearchTerm('');
        }
    };

    const user = {
        name: 'Videco User',
        avatarUrl: 'https://placehold.co/40x40/EFEFEF/333333?text=VU',
    };

    return (
        <header className="bg-white dark:bg-gray-900 shadow-sm h-16 flex-shrink-0 flex items-center justify-between px-6 z-20 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Videco</h1>
                <span className="ml-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium">
                    {currentMode}
                </span>
            </div>

            <div className="flex-1 flex justify-center px-8">
                <div className="relative w-full max-w-lg">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="搜索视频... 或聊聊你的心情"
                        className="w-full bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 focus:ring-blue-500 rounded-full py-2 pl-10 pr-4 transition"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
                <div className="flex items-center space-x-2 cursor-pointer">
                    <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="h-9 w-9 rounded-full object-cover border-2 border-transparent hover:border-blue-500 transition"
                    />
                    <span className="font-semibold text-sm hidden md:block">{user.name}</span>
                </div>
            </div>
        </header>
    );
};