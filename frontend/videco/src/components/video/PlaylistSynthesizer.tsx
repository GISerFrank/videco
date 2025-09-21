// src/components/video/PlaylistSynthesizer.tsx
import React from 'react';
import { Plus, X } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { usePlaylistStore } from '@/store/playlistStore';

export const PlaylistSynthesizer: React.FC = () => {
    const { seedVideo, sequence, addModule, getAvailableModules } = usePlaylistStore();
    const { closeRightPanel } = useAppStore();
    const availableModules = getAvailableModules();

    if (!seedVideo) {
        return (
            <div className="p-4 text-center">
                <p>请先选择一个种子视频</p>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col p-4 bg-white dark:bg-gray-900">
            <header className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">播放列表合成器</h3>
                <button onClick={closeRightPanel} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <X size={20} />
                </button>
            </header>

            <div className="flex-1 overflow-y-auto space-y-6">
                {/* 种子视频 */}
                <section>
                    <h4 className="text-sm font-semibold mb-2 text-gray-500 dark:text-gray-400">种子视频</h4>
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <img src={seedVideo.thumbnailUrl} alt={seedVideo.title} className="w-20 h-12 rounded-md object-cover flex-shrink-0" />
                        <div>
                            <p className="text-sm font-semibold">{seedVideo.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{seedVideo.uploader}</p>
                        </div>
                    </div>
                </section>

                {/* 推荐模块 */}
                <section>
                    <h4 className="text-sm font-semibold mb-2 text-gray-500 dark:text-gray-400">添加主题模块</h4>
                    <div className="space-y-2">
                        {availableModules.map(module => (
                            <button key={module.id} onClick={() => addModule(module)} className="w-full flex items-center justify-between text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition">
                                <span className="text-sm">{module.title}</span>
                                <Plus size={16} className="text-gray-400" />
                            </button>
                        ))}
                    </div>
                </section>

                {/* 当前序列 */}
                <section>
                    <h4 className="text-sm font-semibold mb-2 text-gray-500 dark:text-gray-400">当前观看序列</h4>
                    <div className="space-y-2">
                        {sequence.length > 0 ? (
                            sequence.map(module => (
                                <div key={module.id} className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                    <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm">{module.title}</p>
                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">包含 {module.videos.length} 个视频</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-xs text-gray-400 py-4">从上方添加模块来构建你的观看序列</div>
                        )}
                    </div>
                </section>
            </div>

            <footer className="mt-4">
                <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
                    开始播放 ({sequence.flatMap(m => m.videos).length}个视频)
                </button>
            </footer>
        </div>
    );
};