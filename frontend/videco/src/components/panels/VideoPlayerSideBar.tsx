// src/components/panels/VideoPlayerSidebar.tsx
import React from 'react';
import { PanelHeader } from '@/layouts/MainLayout';
import { PlaySquare, ListVideo, SlidersHorizontal } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { usePlaylistStore, VideoSnippet } from '@/store/playlistStore';
import { PlaylistSynthesizer } from '@/components/video/PlaylistSynthesizer';

const mockChapters = [
    { time: '0:00', title: '开场 & 行程预告' },
    { time: '1:25', title: '第一站：秋叶原电器街' },
    { time: '4:15', title: '关键信息：吉卜力美术馆预约' },
];

const mockRelatedVideos = [
    {
        id: 'related1',
        title: '关西自然与古都探索',
        uploader: '旅行者小明',
        thumbnailUrl: 'https://placehold.co/160x90/2ecc71/ffffff?text=Kyoto',
    },
];

// 模拟当前正在播放的视频
const currentVideo: VideoSnippet = {
    id: 'example',
    title: '探索东京：一次难忘的动漫文化之旅',
    uploader: '旅行者小明',
    thumbnailUrl: 'https://placehold.co/160x90/3498db/ffffff?text=TokyoVlog'
};

export const VideoPlayerSidebar: React.FC = () => {
    const { setRightPanelContent } = useAppStore();
    const { setSeedVideo } = usePlaylistStore();

    const handleOpenSynthesizer = () => {
        // 1. 设置种子视频
        setSeedVideo(currentVideo);
        // 2. 在右侧面板中渲染合成器
        setRightPanelContent(<PlaylistSynthesizer />);
    };

    return (
        <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <PanelHeader title="视频详情" />
            <div className="flex-1 p-4 overflow-y-auto space-y-6">
                {/* "创建播放序列" 入口 */}
                <section>
                    <button
                        onClick={handleOpenSynthesizer}
                        className="w-full flex items-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-sm hover:bg-blue-700 transition"
                    >
                        <SlidersHorizontal size={18} />
                        <span className="font-semibold">创建播放序列</span>
                    </button>
                </section>

                <section>
                    <h3 className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400 flex items-center">
                        <ListVideo size={16} className="mr-2" />
                        视频章节
                    </h3>
                    <div className="space-y-1">
                        {mockChapters.map((chapter, index) => (
                            <button key={index} className="w-full text-left text-sm p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition flex justify-between">
                                <span><span className="font-mono">{chapter.time}</span> - {chapter.title}</span>
                                <PlaySquare size={16} className="text-gray-400" />
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400">接下来播放</h3>
                    <div className="space-y-3">
                        {mockRelatedVideos.map(video => (
                            <a href="#" key={video.id} className="flex items-center space-x-3 group">
                                <img src={video.thumbnailUrl} alt={video.title} className="w-24 h-14 rounded-md object-cover flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold group-hover:text-blue-500 transition line-clamp-2">{video.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{video.uploader}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};