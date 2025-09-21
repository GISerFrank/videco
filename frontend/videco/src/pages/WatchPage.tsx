// src/pages/WatchPage.tsx
import React from 'react';
import { ThumbsUp, MessageCircle, Share2, Bookmark, Tag } from 'lucide-react';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { InteractionTabs } from '@/components/video/InteractionTabs'; // 1. 导入新的互动组件


// 模拟视频数据，为页面提供内容
const mockVideoData = {
    title: '探索东京：一次难忘的动漫文化之旅',
    uploader: {
        name: '旅行者小明',
        avatarUrl: 'https://placehold.co/48x48/3498db/ffffff?text=XM',
        subscribers: '12.5万',
    },
    views: '1,452,899 次观看',
    uploadedAt: '3 周前',
    description: '跟随我的脚步，一起探索东京的秋叶原、三鹰之森吉卜力美术馆，还有那些隐藏在街头巷尾的动漫小店！这次旅行充满了惊喜与感动。',
};

// 模拟评论数据
const mockComments = [
    { id: 'c1', user: '路人甲', comment: '太棒了！我也想去吉卜力美术馆！', avatar: 'https://placehold.co/40x40/EFEFEF/333333?text=A' },
    { id: 'c2', user: 'Videco用户', comment: '视频拍得真好，收藏了！下次去东京就参考这个路线。', avatar: 'https://placehold.co/40x40/EFEFEF/333333?text=B' },
];

export const WatchPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* 1. 视频播放器 */}
            <VideoPlayer />

            {/* 2. 视频信息和操作 */}
            <div className="mt-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{mockVideoData.title}</h1>
                <div className="flex flex-wrap justify-between items-center mt-2 gap-4">
                    <div className="flex items-center space-x-4">
                        <img src={mockVideoData.uploader.avatarUrl} alt={mockVideoData.uploader.name} className="w-12 h-12 rounded-full" />
                        <div>
                            <p className="font-semibold">{mockVideoData.uploader.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{mockVideoData.uploader.subscribers} 订阅者</p>
                        </div>
                        <button className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full font-semibold">订阅</button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                            <ThumbsUp className="h-5 w-5" />
                            <span>1.8万</span>
                        </button>
                        {/* 2. 新增“添加标签”按钮 */}
                        <button className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                            <Tag className="h-5 w-5" />
                            <span>添加标签</span>
                        </button>
                        <button className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                            <Share2 className="h-5 w-5" />
                        </button>
                        <button className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                            <Bookmark className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. 视频简介 */}
            <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-semibold text-sm">{mockVideoData.views} · {mockVideoData.uploadedAt}</p>
                <p className="text-sm mt-2">{mockVideoData.description}</p>
            </div>

            {/* 4. 升级后的互动区域 */}
            <div className="mt-6">
                <InteractionTabs />
            </div>
        </div>
    );
};
