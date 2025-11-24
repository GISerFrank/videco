// src/store/statsStore.ts
import { create } from 'zustand';
import {
  OverallStats,
  TimeRange,
  CustomTimeRange,
  StatsQuery,
  Achievement,
} from '@/types/stats.types';

interface StatsState {
  // 统计数据
  overallStats: OverallStats | null;
  achievements: Achievement[];

  // 查询参数
  timeRange: TimeRange;
  customRange: CustomTimeRange | null;

  // UI 状态
  isLoading: boolean;
  error: string | null;

  // Actions
  setOverallStats: (stats: OverallStats) => void;
  setAchievements: (achievements: Achievement[]) => void;
  setTimeRange: (range: TimeRange, customRange?: CustomTimeRange) => void;

  // 数据获取
  fetchStats: (query?: Partial<StatsQuery>) => Promise<void>;
  fetchAchievements: () => Promise<void>;

  // 成就相关
  unlockAchievement: (achievementId: string) => void;
}

export const useStatsStore = create<StatsState>((set, get) => ({
  // 初始状态
  overallStats: null,
  achievements: [],

  timeRange: 'month',
  customRange: null,

  isLoading: false,
  error: null,

  // Actions
  setOverallStats: (stats) => set({ overallStats: stats }),
  setAchievements: (achievements) => set({ achievements }),

  setTimeRange: (range, customRange) =>
    set({ timeRange: range, customRange: customRange || null }),

  // 数据获取
  fetchStats: async (query) => {
    set({ isLoading: true, error: null });

    try {
      // TODO: 替换为真实 API
      // const stats = await statsService.getStats(query);

      // Mock 数据
      const mockStats: OverallStats = {
        video: {
          totalWatchTime: 1250,
          totalVideos: 45,
          averageSessionTime: 27.8,
          completionRate: 78,
          byCategory: [
            { category: '旅行', count: 15, watchTime: 450 },
            { category: '学习', count: 12, watchTime: 380 },
            { category: '美食', count: 10, watchTime: 250 },
          ],
          byTimeOfDay: [],
          trend: [],
          emotionDistribution: [
            { emotion: '放松', count: 15, percentage: 33 },
            { emotion: '专注', count: 12, percentage: 27 },
            { emotion: '启发', count: 10, percentage: 22 },
          ],
        },
        knowledge: {
          totalNotes: 128,
          totalTags: 45,
          totalConnections: 67,
          averageNotesPerVideo: 2.84,
          growthTrend: [],
          tagDistribution: [
            { tag: '咖啡', count: 23, recentUse: 5 },
            { tag: '日本旅行', count: 18, recentUse: 8 },
            { tag: '摄影', count: 15, recentUse: 3 },
          ],
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
          byType: [
            { type: '学习', count: 5, completed: 2 },
            { type: '旅行', count: 3, completed: 1 },
            { type: '技能', count: 4, completed: 1 },
          ],
          byStatus: [
            { status: '进行中', count: 5 },
            { status: '未开始', count: 3 },
            { status: '已完成', count: 4 },
          ],
          completionTrend: [],
          averageCompletionTime: 45,
          progressDistribution: [
            { range: '0-25', count: 3 },
            { range: '26-50', count: 2 },
            { range: '51-75', count: 2 },
            { range: '76-100', count: 5 },
          ],
        },
        habits: {
          totalHabits: 6,
          activeHabits: 4,
          currentStreak: 7,
          longestStreak: 21,
          overallCompletionRate: 82,
          habits: [
            {
              id: 'h1',
              name: '每日心流模式',
              completionRate: 85,
              currentStreak: 7,
              longestStreak: 14,
            },
            {
              id: 'h2',
              name: '观看学习视频',
              completionRate: 78,
              currentStreak: 5,
              longestStreak: 21,
            },
          ],
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
      };

      set({ overallStats: mockStats, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '加载统计数据失败',
        isLoading: false,
      });
    }
  },

  fetchAchievements: async () => {
    try {
      // TODO: 替换为真实 API
      // const achievements = await statsService.getAchievements();

      // Mock 数据
      const mockAchievements: Achievement[] = [
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
          unlockedAt: '2025-11-15T00:00:00Z',
          progress: 100,
          requirement: 100,
          category: 'knowledge',
          rarity: 'rare',
        },
        {
          id: 'ach-3',
          title: '目标达人',
          description: '完成 10 个目标',
          icon: '🎯',
          progress: 40,
          requirement: 10,
          category: 'goal',
          rarity: 'epic',
        },
      ];

      set({ achievements: mockAchievements });
    } catch (error) {
      console.error('加载成就失败:', error);
    }
  },

  unlockAchievement: (achievementId) =>
    set((state) => ({
      achievements: state.achievements.map((a) =>
        a.id === achievementId
          ? { ...a, unlockedAt: new Date().toISOString(), progress: 100 }
          : a
      ),
    })),
}));
