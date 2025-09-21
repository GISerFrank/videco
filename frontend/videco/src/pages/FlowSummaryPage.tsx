// src/pages/FlowSummaryPage.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wind, Home, Zap, Smile, Meh, Frown } from 'lucide-react';

// 模拟的本次心流播放过的视频
const mockPlaylist = [
    { id: 'v1', title: '治愈的猫咪视频', thumbnailUrl: 'https://placehold.co/160x90/2ecc71/ffffff?text=Cat' },
    { id: 'v2', title: '安静的乡村美食Vlog', thumbnailUrl: 'https://placehold.co/160x90/e67e22/ffffff?text=Food' },
    { id: 'v3', title: '宁静的风景延时摄影', thumbnailUrl: 'https://placehold.co/160x90/3498db/ffffff?text=Nature' },
];

export const FlowSummaryPage: React.FC = () => {
    // 在真实应用中，我们会从 location.state 或 store 中获取真实数据
    const mood = '😊 放松';
    const duration = '45分钟';

    return (
        <div className="w-screen h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8">
            <div className="max-w-2xl w-full text-center">
                <Wind className="mx-auto h-16 w-16 text-blue-400 dark:text-blue-600 mb-4" />
                <h1 className="text-3xl font-bold">你的「{mood}」心流旅程已完成</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">你刚刚沉浸了 {duration} 的美好时光。</p>

                <div className="my-10">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">旅程足迹</h3>
                    <div className="flex justify-center items-center gap-4 flex-wrap">
                        {mockPlaylist.map(video => (
                            <div key={video.id} className="group relative">
                                <img src={video.thumbnailUrl} alt={video.title} className="w-40 h-24 rounded-lg object-cover shadow-md transition-transform transform group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                    <p className="text-white text-xs text-center p-2">{video.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-10">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">这次旅程感觉如何？</h3>
                    <div className="flex justify-center space-x-4">
                        <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900 transition"><Smile className="text-green-500" /></button>
                        <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-yellow-900 transition"><Meh className="text-yellow-500" /></button>
                        <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900 transition"><Frown className="text-red-500" /></button>
                    </div>
                </div>


                <div className="flex justify-center items-center space-x-6 text-sm">
                    <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition flex items-center space-x-2">
                        <Home size={16} />
                        <span>返回首页</span>
                    </Link>
                    <Link to="#" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline transition flex items-center space-x-2">
                        <Zap size={16} />
                        <span>开启另一段心流</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};