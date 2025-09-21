// src/pages/FlowPlayerPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { XCircle, Play, Pause } from 'lucide-react';

const generateFlowPlaylist = async (mood: string, duration: string): Promise<string[]> => {
    console.log(`Generating playlist for mood: ${mood}, duration: ${duration}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return ['video1', 'video2', 'video3'];
};

export const FlowPlayerPage: React.FC = () => {
    const location = useLocation();
    const { targetMood, duration } = location.state || { targetMood: '未知', duration: '未知' };
    const [playlist, setPlaylist] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        generateFlowPlaylist(targetMood, duration).then(ids => {
            setPlaylist(ids);
            setIsLoading(false);
        });
    }, [targetMood, duration]);

    if (isLoading) {
        return (
            <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white">
                <p className="animate-pulse">正在为您定制「{targetMood}」心流旅程...</p>
                <p className="text-sm text-gray-400 mt-2">时长: {duration}</p>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen bg-black flex items-center justify-center relative group">
            {/* 退出按钮现在指向新的着陆页 */}
            <Link
                to="/flow/summary"
                state={{ mood: targetMood, duration, playlist }} // 传递数据到着陆页
                className="absolute top-5 right-5 z-20 p-2 text-white/50 hover:text-white transition-colors"
            >
                <XCircle size={32} />
                <span className="sr-only">退出心流</span>
            </Link>

            <div className="w-full max-w-6xl aspect-video bg-gray-900 flex items-center justify-center text-gray-500">
                <p>视频播放器区域 (当前播放: {playlist[0]})</p>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-full h-1 bg-white/20 rounded-full mb-2">
                    <div style={{ width: '10%' }} className="h-full bg-blue-500 rounded-full"></div>
                </div>
                <div className="flex justify-center items-center">
                    <button className="text-white p-2">
                        <Pause size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};