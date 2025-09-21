// src/store/knowledgeStore.ts
import { create } from 'zustand';

// 1. 定义知识卡片的数据结构
export interface KnowledgeCard {
    id: string;
    content: string;
    timestamp: string | null;
    tags: string[];
    source: {
        videoId: string;
        videoTitle: string;
        uploaderName: string;
        thumbnailUrl: string;
    };
    createdAt: string;
}

interface KnowledgeState {
    cards: KnowledgeCard[];
    tags: () => string[];
    addCard: (card: KnowledgeCard) => void;
    // 未来可以添加更多actions, 如 filterByTag, searchCards 等
}

// 2. 创建带有模拟数据的 Store
const mockCards: KnowledgeCard[] = [
    {
        id: 'kc1',
        content: '吉卜力美术馆需要提前在官网预约，现场不售票，这是关键信息！',
        timestamp: '4:15',
        tags: ['#旅行准备', '#避坑指南'],
        source: {
            videoId: 'example',
            videoTitle: '探索东京：一次难忘的动漫文化之旅',
            uploaderName: '旅行者小明',
            thumbnailUrl: 'https://placehold.co/160x90/3498db/ffffff?text=TokyoVlog',
        },
        createdAt: new Date().toISOString(),
    },
    {
        id: 'kc2',
        content: '秋叶原的手办店真的非常多，可以多逛几家比比价。',
        timestamp: '12:30',
        tags: ['#购物心得', '#旅行准备'],
        source: {
            videoId: 'example',
            videoTitle: '探索东京：一次难忘的动漫文化之旅',
            uploaderName: '旅行者小明',
            thumbnailUrl: 'https://placehold.co/160x90/3498db/ffffff?text=TokyoVlog',
        },
        createdAt: new Date().toISOString(),
    },
    {
        id: 'kc3',
        content: '“算法透明度黑箱问题”是当前AI伦理的核心挑战之一。',
        timestamp: '25:05',
        tags: ['#核心观点', '#AI伦理', '#论文素材'],
        source: {
            videoId: 'ai-ethics-doc',
            videoTitle: 'AI伦理与未来社会',
            uploaderName: '知识探索者',
            thumbnailUrl: 'https://placehold.co/160x90/8e44ad/ffffff?text=AI',
        },
        createdAt: new Date().toISOString(),
    },
];

export const useKnowledgeStore = create<KnowledgeState>((set, get) => ({
    cards: mockCards,

    // 一个派生状态，用于获取所有不重复的标签
    tags: () => {
        const allTags = get().cards.flatMap(card => card.tags);
        return [...new Set(allTags)];
    },

    addCard: (card) => {
        set(state => ({ cards: [card, ...state.cards] }));
        console.log('New card added to Knowledge Base:', card);
    },
}));