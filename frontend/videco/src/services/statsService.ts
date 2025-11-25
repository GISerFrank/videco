// src/services/statsService.ts
import axios from 'axios';
import { OverallStats, StatsQuery, Achievement } from '@/types/stats.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 统计数据服务
 */
export const statsService = {
  /**
   * 获取综合统计数据
   */
  async getStats(query?: StatsQuery): Promise<OverallStats> {
    // const response = await api.get('/stats/overall', { params: query });
    // return response.data;

    // Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          video: {
            totalWatchTime: 1250,
            totalVideos: 45,
            averageSessionTime: 27.8,
            completionRate: 78,
            byCategory: [
              { category: '旅行', count: 15, watchTime: 450 },
              { category: '学习', count: 12, watchTime: 380 },
            ],
            byTimeOfDay: [],
            trend: [],
            emotionDistribution: [],
          },
          knowledge: {
            totalNotes: 128,
            totalTags: 45,
            totalConnections: 67,
            averageNotesPerVideo: 2.84,
            growthTrend: [],
            tagDistribution: [],
            qualityMetrics: {
              averageLength: 156,
              withTimestamps: 95,
              withTags: 115,
              withConnections: 67,
            },
          },
          goals: {
            totalGoals: 12,
            activeGoals: 5,
            completedGoals: 4,
            completionRate: 33,
            byType: [],
            byStatus: [],
            completionTrend: [],
            averageCompletionTime: 45,
            progressDistribution: [],
          },
          habits: {
            totalHabits: 6,
            activeHabits: 4,
            currentStreak: 7,
            longestStreak: 21,
            overallCompletionRate: 82,
            habits: [],
            completionTrend: [],
          },
          creation: {
            totalCreations: 23,
            articlesWritten: 12,
            videosCreated: 5,
            collectionsCreated: 6,
            creationTrend: [],
            qualityMetrics: {
              averageLength: 850,
              withImages: 18,
              published: 15,
            },
          },
        });
      }, 500);
    });
  },

  /**
   * 获取成就列表
   */
  async getAchievements(): Promise<Achievement[]> {
    // const response = await api.get('/stats/achievements');
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'ach-1',
            title: '首次心流',
            description: '完成第一次心流模式观看',
            icon: '🌊',
            unlockedAt: '2025-11-01T00:00:00Z',
            progress: 100,
            requirement: 1,
            category: 'video',
            rarity: 'common',
          },
          {
            id: 'ach-2',
            title: '知识收集家',
            description: '创建 100 条笔记',
            icon: '📚',
            progress: 128,
            requirement: 100,
            category: 'knowledge',
            rarity: 'rare',
            unlockedAt: '2025-11-15T00:00:00Z',
          },
          {
            id: 'ach-3',
            title: '目标达人',
            description: '完成 10 个目标',
            icon: '🎯',
            progress: 4,
            requirement: 10,
            category: 'goal',
            rarity: 'epic',
          },
        ]);
      }, 300);
    });
  },

  /**
   * 解锁成就
   */
  async unlockAchievement(achievementId: string): Promise<Achievement> {
    // const response = await api.post(`/stats/achievements/${achievementId}/unlock`);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: achievementId,
          unlockedAt: new Date().toISOString(),
        } as Achievement);
      }, 300);
    });
  },

  /**
   * 导出统计数据
   */
  async exportStats(format: 'json' | 'csv' | 'pdf'): Promise<Blob> {
    // const response = await api.get('/stats/export', {
    //   params: { format },
    //   responseType: 'blob',
    // });
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        const blob = new Blob(['mock data'], { type: 'application/json' });
        resolve(blob);
      }, 500);
    });
  },
};
