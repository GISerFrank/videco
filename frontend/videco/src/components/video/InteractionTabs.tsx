// src/components/video/InteractionTabs.tsx
import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Send, Clock, Loader2, BookPlus } from 'lucide-react'; // 1. 导入新图标
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postNote, getNotes, NewNotePayload, Note } from '@/services/interactionService';

type Tab = 'notes' | 'tags' | 'comments';

const mockTags = [
    { id: 't1', user: '课代表', content: '#核心论点', timestamp: '2:30', likes: 45 },
    { id: 't2', user: '细节控', content: '#关键数据', timestamp: '8:45', likes: 18 },
];

export const InteractionTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('notes');
    const [newNoteContent, setNewNoteContent] = useState('');
    const [associateTimestamp, setAssociateTimestamp] = useState(true);
    const [saveToKB, setSaveToKB] = useState(true); // 2. 新增状态：是否存入知识库
    const queryClient = useQueryClient();
    const videoId = 'exampleVideoId';

    const { data: notes, isLoading: isLoadingNotes, isError: isErrorNotes } = useQuery<Note[]>({
        queryKey: ['notes', videoId],
        queryFn: () => getNotes(videoId),
    });

    const postNoteMutation = useMutation({
        mutationFn: postNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes', videoId] });
            setNewNoteContent('');
            // 在这里，未来我们会调用 useKnowledgeStore 的 addCard action
            if (saveToKB) {
                console.log("Simulating: This note would be saved to the Knowledge Base.");
            }
        },
        onError: (error) => {
            console.error("Failed to post note:", error);
            alert("发表失败，请稍后再试。");
        }
    });

    const handleNoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNoteContent.trim() || postNoteMutation.isPending) return;

        const payload: NewNotePayload = {
            content: newNoteContent,
            timestamp: associateTimestamp ? '0:15' : null,
            videoId: videoId,
        };

        postNoteMutation.mutate(payload);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'notes':
                if (isLoadingNotes) return <div className="flex justify-center p-8"><Loader2 className="animate-spin h-8 w-8 text-blue-500" /></div>;
                if (isErrorNotes) return <div className="text-center text-red-500 p-8">加载笔记失败，请稍后刷新。</div>;
                return (
                    <div className="space-y-4">
                        {notes?.map(note => (
                            <div key={note.id} className="flex items-start space-x-4">
                                <img src={note.avatar} alt={note.user} className="w-10 h-10 rounded-full" />
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">{note.user}</p>
                                    <p className="my-1">{note.content}</p>
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                        {note.timestamp && (
                                            <span className="cursor-pointer text-blue-500 font-semibold hover:underline">@{note.timestamp}</span>
                                        )}
                                        <button className="flex items-center space-x-1 hover:text-blue-500"><ThumbsUp size={14} /><span>{note.likes}</span></button>
                                        <button className="flex items-center space-x-1 hover:text-blue-500"><MessageCircle size={14} /><span>{note.replies} 回复</span></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            // ... (其他tab内容保持不变)
            case 'tags':
                return (
                    <div className="space-y-4">
                        {mockTags.map(tag => (
                            <div key={tag.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                                <div>
                                    <span className="font-bold text-blue-500 cursor-pointer">{tag.content}</span>
                                    <span className="ml-2 text-sm text-gray-500">@ {tag.timestamp}</span>
                                </div>
                                <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-500"><ThumbsUp size={14} /><span>{tag.likes}</span></button>
                            </div>
                        ))}
                    </div>
                );
            case 'comments':
                return <p>传统的、与时间无关的评论区将会在这里显示。</p>;
            default:
                return null;
        }
    };

    return (
        <div>
            <form onSubmit={handleNoteSubmit} className="mb-6">
                <div className="relative">
                    <textarea
                        value={newNoteContent}
                        onChange={(e) => setNewNoteContent(e.target.value)}
                        className="w-full p-3 pr-24 bg-gray-100 dark:bg-gray-800 rounded-lg border border-transparent focus:border-blue-500 focus:ring-blue-500 transition"
                        placeholder="发表你的笔记或提问..."
                        rows={2}
                        disabled={postNoteMutation.isPending}
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-sm disabled:bg-blue-400 disabled:cursor-not-allowed"
                        disabled={postNoteMutation.isPending}
                    >
                        {postNoteMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                </div>
                {/* 3. 选项区域更新 */}
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="timestamp-check"
                            checked={associateTimestamp}
                            onChange={(e) => setAssociateTimestamp(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="timestamp-check" className="ml-2 text-sm text-gray-600 dark:text-gray-300 flex items-center">
                            <Clock size={14} className="mr-1" />
                            关联当前时间 (0:15)
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="kb-check"
                            checked={saveToKB}
                            onChange={(e) => setSaveToKB(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="kb-check" className="ml-2 text-sm text-gray-600 dark:text-gray-300 flex items-center">
                            <BookPlus size={14} className="mr-1" />
                            存入知识库
                        </label>
                    </div>
                </div>
            </form>

            <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                <nav className="flex space-x-4" aria-label="Tabs">
                    <button onClick={() => setActiveTab('notes')} className={`px-3 py-2 font-medium text-sm rounded-t-md ${activeTab === 'notes' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                        笔记/问答
                    </button>
                    <button onClick={() => setActiveTab('tags')} className={`px-3 py-2 font-medium text-sm rounded-t-md ${activeTab === 'tags' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                        热门标签
                    </button>
                    <button onClick={() => setActiveTab('comments')} className={`px-3 py-2 font-medium text-sm rounded-t-md ${activeTab === 'comments' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                        普通评论
                    </button>
                </nav>
            </div>

            <div>
                {renderTabContent()}
            </div>
        </div>
    );
};