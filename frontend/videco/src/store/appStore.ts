// src/store/appStore.ts
import { create } from 'zustand';
import React from 'react';

export type AppMode = 'video-consumption' | 'itinerary-planning' | 'knowledge-management' | 'default';

interface AppState {
    appMode: AppMode;
    isRightPanelOpen: boolean;
    rightPanelContent: React.ReactNode | null;
    isModalOpen: boolean; // 1. 新增：模态框是否打开
    modalContent: React.ReactNode | null; // 2. 新增：模态框的内容
    setAppMode: (mode: AppMode) => void;
    toggleRightPanel: (isOpen?: boolean) => void;
    setRightPanelContent: (content: React.ReactNode) => void;
    closeRightPanel: () => void;
    openModal: (content: React.ReactNode) => void; // 3. 新增：打开模态框的 action
    closeModal: () => void; // 4. 新增：关闭模态框的 action
}

export const useAppStore = create<AppState>((set) => ({
    appMode: 'default',
    isRightPanelOpen: false,
    rightPanelContent: null,
    isModalOpen: false,
    modalContent: null,

    setAppMode: (mode) => set({ appMode: mode }),

    toggleRightPanel: (isOpen) => set((state) => ({
        isRightPanelOpen: isOpen !== undefined ? isOpen : !state.isRightPanelOpen
    })),

    setRightPanelContent: (content) => set({
        rightPanelContent: content,
        isRightPanelOpen: true,
    }),

    closeRightPanel: () => set({
        isRightPanelOpen: false,
        rightPanelContent: null,
    }),

    openModal: (content) => set({
        isModalOpen: true,
        modalContent: content,
    }),

    closeModal: () => set({
        isModalOpen: false,
        modalContent: null,
    }),
}));