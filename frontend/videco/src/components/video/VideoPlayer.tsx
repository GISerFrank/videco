// src/components/video/VideoPlayer.tsx
import React from 'react';
import { Play, Pause, Volume2, Maximize, ThumbsUp, MessageCircle, Share2, Bookmark, Heart, Laugh, Lightbulb, Flame } from 'lucide-react';

/**
 * 视频播放器的基础组件。
 * 现已集成情绪互动层的基础UI。
 */
export const VideoPlayer: React.FC = () => {
    // 模拟播放状态
    const [isPlaying, setIsPlaying] = React.useState(false);

    return (
        <div className="relative w-full aspect-video bg-black rounded-lg shadow-lg overflow-hidden group">
            {/* 视频内容占位符 */}
            <div className="w-full h-full flex items-center justify-center text-white">
                <p>视频播放器区域</p>
            </div>

            {/* 情绪能量曲线的覆盖层 (目前用渐变模拟) */}
            <div className="absolute top-0 left-0 w-full h-24 pointer-events-none bg-gradient-to-b from-black/30 to-transparent">
                {/* 在这里，未来我们会用D3.js或Recharts来绘制真实的数据曲线 */}
            </div>

            {/* 控制条与互动按钮的覆盖层 (在鼠标悬停时显示) */}
            <div className="absolute bottom-0 left-0 w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 to-transparent">
                {/* 进度条 */}
                <div className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer mb-2">
                    <div className="w-1/3 h-full bg-blue-500 rounded-full"></div>
                </div>

                {/* 控制按钮 */}
                <div className="flex justify-between items-center text-white">
                    {/* 左侧控制 */}
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        <Volume2 size={20} />
                    </div>

                    {/* 中央情绪互动按钮 */}
                    <div className="flex items-center space-x-3">
                        <button className="p-2 rounded-full hover:bg-white/20 transition-colors"><Flame size={20} /></button>
                        <button className="p-2 rounded-full hover:bg-white/20 transition-colors"><Laugh size={20} /></button>
                        <button className="p-2 rounded-full hover:bg-white/20 transition-colors"><Lightbulb size={20} /></button>
                        <button className="p-2 rounded-full hover:bg-white/20 transition-colors"><Heart size={20} /></button>
                    </div>

                    {/* 右侧控制 */}
                    <div className="flex items-center space-x-4">
                        <Maximize size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};
