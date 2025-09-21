// src/pages/KnowledgeBasePage.tsx
import React, { useState } from 'react';
import { Tag, Video, Inbox, BookCopy, Search } from 'lucide-react';
import { useKnowledgeStore, KnowledgeCard } from '@/store/knowledgeStore';

// --- 子组件 ---

// 左侧导航栏
const KnowledgeSidebar = ({ onSelectTag, selectedTag }: { onSelectTag: (tag: string | null) => void, selectedTag: string | null }) => {
    const { tags } = useKnowledgeStore();
    const allTags = tags();

    return (
        <div className="p-4 h-full bg-white dark:bg-gray-900 flex flex-col border-r border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold mb-4">知识库导航</h2>
            <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                    <Inbox className="h-5 w-5" />
                    <span className="font-semibold">收件箱</span>
                </button>
                <button onClick={() => onSelectTag(null)} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${!selectedTag ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                    <BookCopy className="h-5 w-5" />
                    <span>所有笔记</span>
                </button>
            </div>
            <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-3 mb-2">标签</h3>
                <div className="space-y-1">
                    {allTags.map(tag => (
                        <button key={tag} onClick={() => onSelectTag(tag)} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-sm ${selectedTag === tag ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                            <Tag className="h-4 w-4" />
                            <span>{tag.replace('#','')}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 中间信息流的卡片
const KCard = ({ card }: { card: KnowledgeCard }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-3 transform hover:-translate-y-1 transition-transform duration-300">
        <p className="text-gray-800 dark:text-gray-200">{card.content}</p>
        <div className="flex flex-wrap gap-2">
            {card.tags.map(tag => (
                <span key={tag} className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">{tag}</span>
            ))}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2 cursor-pointer hover:underline">
                <Video className="h-4 w-4" />
                <span>来源: {card.source.videoTitle} @{card.timestamp}</span>
            </div>
        </div>
    </div>
);

// --- 主页面组件 ---

export const KnowledgeBasePage: React.FC = () => {
    const { cards } = useKnowledgeStore();
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const filteredCards = selectedTag
        ? cards.filter(card => card.tags.includes(selectedTag))
        : cards;

    return (
        <div className="flex h-full bg-gray-50 dark:bg-gray-900/50">
            {/* 左栏: 组织导航 */}
            <aside className="w-64 flex-shrink-0">
                <KnowledgeSidebar onSelectTag={setSelectedTag} selectedTag={selectedTag} />
            </aside>

            {/* 中栏: 信息流 */}
            <main className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="搜索笔记内容、标签、来源..."
                            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full py-2 pl-10 pr-4 transition"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredCards.map(card => (
                            <KCard key={card.id} card={card} />
                        ))}
                    </div>
                </div>
            </main>

            {/* 右栏: 内容详情 (占位符) */}
            <aside className="w-80 bg-white dark:bg-gray-900 p-6 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
                <h3 className="text-lg font-bold">笔记详情</h3>
                <div className="mt-4 text-sm text-gray-500">
                    在中间选择一张卡片来查看其完整内容、进行编辑或查看AI推荐的关联笔记。
                </div>
            </aside>
        </div>
    );
};