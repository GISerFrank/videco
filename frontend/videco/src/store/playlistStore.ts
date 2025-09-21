// src/store/playlistStore.ts
import { create } from 'zustand';

// 定义视频和模块的类型
export interface VideoSnippet {
    id: string;
    title: string;
    uploader: string;
    thumbnailUrl: string;
}

export interface StyleModule {
    id: string;
    title: string;
    // a real implementation would have rules to fetch videos
    videos: VideoSnippet[];
}

interface PlaylistState {
    seedVideo: VideoSnippet | null;
    sequence: StyleModule[];
    setSeedVideo: (video: VideoSnippet) => void;
    addModule: (module: StyleModule) => void;
    // future actions: removeModule, reorderModules, etc.
}

// 模拟的推荐模块
const mockModules: StyleModule[] = [
    {
        id: 'mod1', title: '【设备评测】', videos: [
            { id: 'v1', title: '顶级磨豆机横评', uploader: '咖啡Geek', thumbnailUrl: 'https://placehold.co/160x90/e74c3c/ffffff?text=Grinder' }
        ]
    },
    {
        id: 'mod2', title: '【拉花技巧】', videos: [
            { id: 'v2', title: '新手也能学会的3种拉花', uploader: '拿铁艺术家', thumbnailUrl: 'https://placehold.co/160x90/3498db/ffffff?text=LatteArt' }
        ]
    },
    {
        id: 'mod3', title: '【同款BGM】', videos: [
            { id: 'v3', title: 'Lo-fi Beats for Study/Relax', uploader: 'Chill Cow', thumbnailUrl: 'https://placehold.co/160x90/2ecc71/ffffff?text=Music' }
        ]
    },
];

export const usePlaylistStore = create<PlaylistState>((set) => ({
    seedVideo: null,
    sequence: [],

    setSeedVideo: (video) => set({
        seedVideo: video,
        // Reset sequence when a new seed is set
        sequence: [],
    }),

    addModule: (module) => set((state) => ({
        // Prevent adding duplicate modules
        sequence: state.sequence.some(m => m.id === module.id)
            ? state.sequence
            : [...state.sequence, module]
    })),

    //提供一些用于演示的模块
    getAvailableModules: () => mockModules,
}));