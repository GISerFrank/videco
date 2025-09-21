// src/components/panels/KnowledgeBasePanel.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Send } from 'lucide-react';
import { useKnowledgeStore } from '@/store/knowledgeStore';

// 导入我们在 MainLayout 中创建的 PanelHeader
// 注意：我们需要先去 MainLayout.tsx 文件中导出它
import { PanelHeader } from '@/layouts/MainLayout';

export const KnowledgeBasePanel: React.FC = () => {
    const [quickNote, setQuickNote] = useState('');
    const { cards, tags, addCard } = useKnowledgeStore();
    const allTags = tags();
    const recentCards = cards.slice(0, 3); // 获取最新的3张卡片

    const handleQuickAdd = () => {
        if (!quickNote.trim()) return;

        // 创建一个新的知识卡片对象
        const newCard = {
            id: `kc${Date.now()}`,
            content: quickNote,
            timestamp: null, // 快速添加的笔记没有时间戳
            tags: ['#收件箱'], // 默认放入收件箱
            source: {
                videoId: 'quick-add',
                videoTitle: '快速添加的笔记',
                uploaderName: 'You',
                thumbnailUrl: '',
            },
            createdAt: new Date().toISOString(),
        };

        addCard(newCard);
        setQuickNote(''); // 清空输入框
    };


    return (
        <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <PanelHeader title="知识库" />
            <div className="flex-1 p-4 overflow-y-auto space-y-6">
                {/* 1. 快速添加模块 */}
                <section>
                    <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">快速添加</h3>
                    <div className="relative">
                        <textarea
                            value={quickNote}
                            onChange={(e) => setQuickNote(e.target.value)}
                            placeholder="随时记录你的想法..."
                            rows={3}
                            className="w-full p-2 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 transition text-sm"
                        />
                        <button
                            onClick={handleQuickAdd}
                            className="absolute right-2 bottom-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-sm disabled:bg-blue-400"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </section>

                {/* 2. 最近添加模块 */}
                <section>
                    <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">最近添加</h3>
                    <div className="space-y-2">
                        {recentCards.map(card => (
                            <Link to="/me/knowledge-base" key={card.id} className="block p-2 rounded-md bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition">
                                <p className="text-sm truncate">{card.content}</p>
                                <p className="text-xs text-gray-400 mt-1">{card.tags.join(' ')}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 3. 热门标签模块 */}
                <section>
                    <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">热门标签</h3>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                            <Link to="/me/knowledge-base" key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                                {tag}
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};