// src/store/hubStore.ts
import { create } from 'zustand';
import {
  WidgetConfig,
  VideoConsumptionStats,
  KnowledgeGrowthStats,
  HabitData,
  TimelineActivity,
  DashboardState,
} from '@/types/hub.types';
import { Insight } from '@/types/insight.types';

interface HubState {
  // 仪表板状态
  dashboard: DashboardState;

  // 统计数据
  videoStats: VideoConsumptionStats | null;
  knowledgeStats: KnowledgeGrowthStats | null;
  habits: HabitData[];

  // 时间线
  timeline: TimelineActivity[];
  timelineFilter: string[];

  // AI 洞察
  insights: Insight[];
  unreadInsightsCount: number;

  // UI 状态
  isLoading: boolean;
  error: string | null;

  // Actions
  setDashboard: (dashboard: DashboardState) => void;
  updateWidgetConfig: (widgetId: string, config: Partial<WidgetConfig>) => void;
  addWidget: (widget: WidgetConfig) => void;
  removeWidget: (widgetId: string) => void;

  setVideoStats: (stats: VideoConsumptionStats) => void;
  setKnowledgeStats: (stats: KnowledgeGrowthStats) => void;

  setHabits: (habits: HabitData[]) => void;
  addHabit: (habit: HabitData) => void;
  updateHabit: (habitId: string, updates: Partial<HabitData>) => void;
  completeHabit: (habitId: string, date: string) => void;

  setTimeline: (activities: TimelineActivity[]) => void;
  addTimelineActivity: (activity: TimelineActivity) => void;
  setTimelineFilter: (filter: string[]) => void;

  setInsights: (insights: Insight[]) => void;
  addInsight: (insight: Insight) => void;
  markInsightAsRead: (insightId: string) => void;
  dismissInsight: (insightId: string) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // 初始化数据
  fetchDashboardData: () => Promise<void>;
  refreshStats: () => Promise<void>;
}

// 默认小组件配置
const defaultWidgets: WidgetConfig[] = [
  {
    id: 'video-consumption',
    type: 'video-consumption',
    title: '视频消费统计',
    position: { x: 0, y: 0 },
    size: { width: 2, height: 1 },
    isVisible: true,
  },
  {
    id: 'knowledge-growth',
    type: 'knowledge-growth',
    title: '知识增长',
    position: { x: 2, y: 0 },
    size: { width: 2, height: 1 },
    isVisible: true,
  },
  {
    id: 'goal-progress',
    type: 'goal-progress',
    title: '目标进度',
    position: { x: 0, y: 1 },
    size: { width: 2, height: 1 },
    isVisible: true,
  },
  {
    id: 'habit-tracker',
    type: 'habit-tracker',
    title: '习惯追踪',
    position: { x: 2, y: 1 },
    size: { width: 2, height: 1 },
    isVisible: true,
  },
];

export const useHubStore = create<HubState>((set, get) => ({
  // 初始状态
  dashboard: {
    widgets: defaultWidgets,
    lastUpdated: new Date().toISOString(),
    isLoading: false,
  },

  videoStats: null,
  knowledgeStats: null,
  habits: [],

  timeline: [],
  timelineFilter: [],

  insights: [],
  unreadInsightsCount: 0,

  isLoading: false,
  error: null,

  // Dashboard actions
  setDashboard: (dashboard) => set({ dashboard }),

  updateWidgetConfig: (widgetId, config) =>
    set((state) => ({
      dashboard: {
        ...state.dashboard,
        widgets: state.dashboard.widgets.map((w) =>
          w.id === widgetId ? { ...w, ...config } : w
        ),
      },
    })),

  addWidget: (widget) =>
    set((state) => ({
      dashboard: {
        ...state.dashboard,
        widgets: [...state.dashboard.widgets, widget],
      },
    })),

  removeWidget: (widgetId) =>
    set((state) => ({
      dashboard: {
        ...state.dashboard,
        widgets: state.dashboard.widgets.filter((w) => w.id !== widgetId),
      },
    })),

  // Stats actions
  setVideoStats: (stats) => set({ videoStats: stats }),
  setKnowledgeStats: (stats) => set({ knowledgeStats: stats }),

  // Habits actions
  setHabits: (habits) => set({ habits }),

  addHabit: (habit) =>
    set((state) => ({
      habits: [...state.habits, habit],
    })),

  updateHabit: (habitId, updates) =>
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === habitId ? { ...h, ...updates } : h
      ),
    })),

  completeHabit: (habitId, date) =>
    set((state) => ({
      habits: state.habits.map((h) => {
        if (h.id === habitId) {
          const completion = { date, completed: true };
          return {
            ...h,
            completionHistory: [...h.completionHistory, completion],
            currentStreak: h.currentStreak + 1,
            longestStreak: Math.max(h.longestStreak, h.currentStreak + 1),
          };
        }
        return h;
      }),
    })),

  // Timeline actions
  setTimeline: (activities) => set({ timeline: activities }),

  addTimelineActivity: (activity) =>
    set((state) => ({
      timeline: [activity, ...state.timeline],
    })),

  setTimelineFilter: (filter) => set({ timelineFilter: filter }),

  // Insights actions
  setInsights: (insights) =>
    set({
      insights,
      unreadInsightsCount: insights.filter((i) => !i.isRead).length,
    }),

  addInsight: (insight) =>
    set((state) => ({
      insights: [insight, ...state.insights],
      unreadInsightsCount: !insight.isRead
        ? state.unreadInsightsCount + 1
        : state.unreadInsightsCount,
    })),

  markInsightAsRead: (insightId) =>
    set((state) => {
      const insight = state.insights.find((i) => i.id === insightId);
      if (!insight || insight.isRead) return state;

      return {
        insights: state.insights.map((i) =>
          i.id === insightId ? { ...i, isRead: true } : i
        ),
        unreadInsightsCount: state.unreadInsightsCount - 1,
      };
    }),

  dismissInsight: (insightId) =>
    set((state) => {
      const insight = state.insights.find((i) => i.id === insightId);
      if (!insight) return state;

      return {
        insights: state.insights.map((i) =>
          i.id === insightId ? { ...i, isDismissed: true } : i
        ),
        unreadInsightsCount:
          !insight.isRead && !insight.isDismissed
            ? state.unreadInsightsCount - 1
            : state.unreadInsightsCount,
      };
    }),

  // Loading and error
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Data fetching (这里使用 mock 数据，后续接入真实 API)
  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });

    try {
      // TODO: 替换为真实 API 调用
      // const data = await hubService.getDashboardData();

      // Mock 数据
      const mockVideoStats: VideoConsumptionStats = {
        totalWatchTime: 1250,
        videosWatched: 45,
        averageWatchTime: 27.8,
        mostWatchedCategory: '旅行',
        watchTimeByCategory: [
          { category: '旅行', watchTime: 450, percentage: 36, videoCount: 15 },
          { category: '学习', watchTime: 380, percentage: 30.4, videoCount: 12 },
          { category: '美食', watchTime: 250, percentage: 20, videoCount: 10 },
          { category: '其他', watchTime: 170, percentage: 13.6, videoCount: 8 },
        ],
        watchTimeByDay: [],
        currentStreak: 7,
        longestStreak: 14,
      };

      const mockKnowledgeStats: KnowledgeGrowthStats = {
        totalNotes: 128,
        totalTags: 45,
        notesThisWeek: 12,
        notesThisMonth: 48,
        growthTrend: [],
        topTags: [
          { tag: '咖啡', count: 23, growth: 15 },
          { tag: '日本旅行', count: 18, growth: 20 },
          { tag: '摄影', count: 15, growth: 5 },
        ],
        knowledgeDensity: 2.84,
      };

      set({
        videoStats: mockVideoStats,
        knowledgeStats: mockKnowledgeStats,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '加载数据失败',
        isLoading: false,
      });
    }
  },

  refreshStats: async () => {
    // 刷新统计数据
    await get().fetchDashboardData();
  },
}));
