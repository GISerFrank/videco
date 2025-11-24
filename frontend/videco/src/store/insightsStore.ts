// src/store/insightsStore.ts
import { create } from 'zustand';
import { Insight, InsightFilter, InsightSettings } from '@/types/insight.types';

interface InsightsState {
  // 洞察数据
  insights: Insight[];
  unreadCount: number;

  // 筛选
  filter: InsightFilter;

  // 设置
  settings: InsightSettings;

  // UI 状态
  isLoading: boolean;
  error: string | null;

  // Actions
  setInsights: (insights: Insight[]) => void;
  addInsight: (insight: Insight) => void;
  markAsRead: (insightId: string) => void;
  dismiss: (insightId: string) => void;
  batchDismiss: (insightIds: string[]) => void;

  setFilter: (filter: Partial<InsightFilter>) => void;
  clearFilter: () => void;

  updateSettings: (settings: Partial<InsightSettings>) => void;

  // 数据获取
  fetchInsights: () => Promise<void>;
  generateNewInsights: () => Promise<void>;

  // Computed
  getFilteredInsights: () => Insight[];
  getUnreadInsights: () => Insight[];
  getInsightsByCategory: (category: string) => Insight[];
}

const defaultFilter: InsightFilter = {
  categories: undefined,
  priorities: undefined,
  sources: undefined,
  isRead: undefined,
  isDismissed: false,
};

const defaultSettings: InsightSettings = {
  enabledCategories: [
    'learning-pattern',
    'content-recommendation',
    'goal-suggestion',
    'habit-insight',
    'productivity',
    'achievement',
  ],
  notificationPreferences: [],
  analysisFrequency: 'daily',
  privacyLevel: 'full',
};

export const useInsightsStore = create<InsightsState>((set, get) => ({
  // 初始状态
  insights: [],
  unreadCount: 0,

  filter: defaultFilter,
  settings: defaultSettings,

  isLoading: false,
  error: null,

  // Actions
  setInsights: (insights) =>
    set({
      insights,
      unreadCount: insights.filter((i) => !i.isRead && !i.isDismissed).length,
    }),

  addInsight: (insight) =>
    set((state) => ({
      insights: [insight, ...state.insights],
      unreadCount: !insight.isRead && !insight.isDismissed
        ? state.unreadCount + 1
        : state.unreadCount,
    })),

  markAsRead: (insightId) =>
    set((state) => {
      const insight = state.insights.find((i) => i.id === insightId);
      if (!insight || insight.isRead) return state;

      return {
        insights: state.insights.map((i) =>
          i.id === insightId ? { ...i, isRead: true } : i
        ),
        unreadCount: state.unreadCount - 1,
      };
    }),

  dismiss: (insightId) =>
    set((state) => {
      const insight = state.insights.find((i) => i.id === insightId);
      if (!insight || insight.isDismissed) return state;

      const shouldDecrementUnread = !insight.isRead && !insight.isDismissed;

      return {
        insights: state.insights.map((i) =>
          i.id === insightId ? { ...i, isDismissed: true } : i
        ),
        unreadCount: shouldDecrementUnread
          ? state.unreadCount - 1
          : state.unreadCount,
      };
    }),

  batchDismiss: (insightIds) =>
    set((state) => {
      const dismissedInsights = state.insights.filter((i) =>
        insightIds.includes(i.id)
      );
      const unreadDismissedCount = dismissedInsights.filter(
        (i) => !i.isRead && !i.isDismissed
      ).length;

      return {
        insights: state.insights.map((i) =>
          insightIds.includes(i.id) ? { ...i, isDismissed: true } : i
        ),
        unreadCount: state.unreadCount - unreadDismissedCount,
      };
    }),

  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),

  clearFilter: () => set({ filter: defaultFilter }),

  updateSettings: (settings) =>
    set((state) => ({
      settings: { ...state.settings, ...settings },
    })),

  // 数据获取
  fetchInsights: async () => {
    set({ isLoading: true, error: null });

    try {
      // TODO: 替换为真实 API
      // const insights = await insightsService.getInsights();

      // Mock 数据
      const mockInsights: Insight[] = [
        {
          id: 'insight-1',
          category: 'learning-pattern',
          title: '你在晚上 8-10 点学习效率最高',
          description:
            '基于过去 30 天的数据分析，你在晚上 8-10 点观看学习类视频时完成率最高（92%），建议将重要的学习内容安排在这个时间段。',
          source: 'ai-analysis',
          priority: 'high',
          createdAt: new Date().toISOString(),
          isRead: false,
          isDismissed: false,
          evidence: {
            dataPoints: [
              { label: '晚上 8-10 点完成率', value: '92%' },
              { label: '其他时段平均完成率', value: '68%' },
            ],
            confidence: 85,
            sampleSize: 45,
            timeframe: '过去 30 天',
          },
          suggestedActions: [
            {
              id: 'action-1',
              label: '查看学习计划',
              type: 'navigation',
              action: { type: 'navigate', params: { to: '/me/knowledge-base' } },
              isPrimary: true,
            },
          ],
        },
        {
          id: 'insight-2',
          category: 'content-recommendation',
          title: '为你推荐：日本传统工艺系列',
          description:
            '根据你最近对日本旅行和手工艺的兴趣，我们为你精选了一组关于日本传统工艺的视频。',
          source: 'ai-analysis',
          priority: 'medium',
          createdAt: new Date().toISOString(),
          isRead: false,
          isDismissed: false,
          suggestedActions: [
            {
              id: 'action-2',
              label: '查看推荐',
              type: 'navigation',
              action: { type: 'navigate', params: { to: '/video-space' } },
              isPrimary: true,
            },
          ],
        },
        {
          id: 'insight-3',
          category: 'achievement',
          title: '🎉 连续观看 7 天达成！',
          description: '恭喜你保持了 7 天的连续观看记录！继续保持，向 14 天目标前进！',
          source: 'user-behavior',
          priority: 'low',
          createdAt: new Date().toISOString(),
          isRead: false,
          isDismissed: false,
        },
      ];

      set({ insights: mockInsights, isLoading: false });
      set({
        unreadCount: mockInsights.filter((i) => !i.isRead && !i.isDismissed).length,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '加载洞察失败',
        isLoading: false,
      });
    }
  },

  generateNewInsights: async () => {
    // 触发 AI 生成新的洞察
    set({ isLoading: true });
    try {
      // TODO: 调用 AI 服务生成洞察
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: '生成洞察失败' });
    }
  },

  // Computed
  getFilteredInsights: () => {
    const { insights, filter } = get();

    let filtered = insights;

    if (filter.categories && filter.categories.length > 0) {
      filtered = filtered.filter((i) => filter.categories!.includes(i.category));
    }

    if (filter.priorities && filter.priorities.length > 0) {
      filtered = filtered.filter((i) => filter.priorities!.includes(i.priority));
    }

    if (filter.sources && filter.sources.length > 0) {
      filtered = filtered.filter((i) => filter.sources!.includes(i.source));
    }

    if (filter.isRead !== undefined) {
      filtered = filtered.filter((i) => i.isRead === filter.isRead);
    }

    if (filter.isDismissed !== undefined) {
      filtered = filtered.filter((i) => i.isDismissed === filter.isDismissed);
    }

    if (filter.dateRange) {
      const start = new Date(filter.dateRange.start).getTime();
      const end = new Date(filter.dateRange.end).getTime();
      filtered = filtered.filter((i) => {
        const date = new Date(i.createdAt).getTime();
        return date >= start && date <= end;
      });
    }

    return filtered;
  },

  getUnreadInsights: () => {
    return get().insights.filter((i) => !i.isRead && !i.isDismissed);
  },

  getInsightsByCategory: (category) => {
    return get().insights.filter((i) => i.category === category);
  },
}));
