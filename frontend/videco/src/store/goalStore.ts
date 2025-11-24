// src/store/goalStore.ts
import { create } from 'zustand';
import {
  Goal,
  GoalType,
  GoalStatus,
  GoalPriority,
  GoalFilter,
  GoalSortBy,
  CreateGoalInput,
  UpdateGoalInput,
  GoalTemplate,
  Milestone,
} from '@/types/goal.types';

interface GoalState {
  // 目标数据
  goals: Goal[];
  templates: GoalTemplate[];

  // 筛选和排序
  filter: GoalFilter;
  sortBy: GoalSortBy;
  sortOrder: 'asc' | 'desc';

  // 选中的目标
  selectedGoalId: string | null;

  // UI 状态
  isLoading: boolean;
  error: string | null;

  // Actions - 目标 CRUD
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (goalId: string, updates: UpdateGoalInput) => void;
  deleteGoal: (goalId: string) => void;

  // Actions - 里程碑
  addMilestone: (goalId: string, milestone: Milestone) => void;
  updateMilestone: (goalId: string, milestoneId: string, updates: Partial<Milestone>) => void;
  completeMilestone: (goalId: string, milestoneId: string) => void;
  deleteMilestone: (goalId: string, milestoneId: string) => void;

  // Actions - 筛选和排序
  setFilter: (filter: Partial<GoalFilter>) => void;
  clearFilter: () => void;
  setSortBy: (sortBy: GoalSortBy, order?: 'asc' | 'desc') => void;

  // Actions - 选择
  selectGoal: (goalId: string | null) => void;

  // Actions - 模板
  setTemplates: (templates: GoalTemplate[]) => void;

  // Actions - 数据获取
  fetchGoals: () => Promise<void>;
  fetchTemplates: () => Promise<void>;
  createGoalFromTemplate: (input: CreateGoalInput) => Promise<void>;

  // Computed
  getFilteredGoals: () => Goal[];
  getGoalById: (goalId: string) => Goal | undefined;
  getActiveGoals: () => Goal[];
  getCompletedGoals: () => Goal[];
}

// 默认筛选器
const defaultFilter: GoalFilter = {
  types: undefined,
  statuses: undefined,
  priorities: undefined,
  tags: undefined,
  searchQuery: '',
};

// Mock 模板数据
const mockTemplates: GoalTemplate[] = [
  {
    id: 'template-1',
    type: 'learning',
    title: '学习咖啡拉花',
    description: '通过观看视频教程和实践，掌握基础咖啡拉花技巧',
    suggestedMilestones: [
      { title: '学习基础理论', description: '观看入门教程视频', order: 1 },
      { title: '掌握奶泡打发', description: '练习打发奶泡技巧', order: 2 },
      { title: '完成第一个心形', description: '成功制作心形拉花', order: 3 },
      { title: '掌握郁金香', description: '学会制作郁金香图案', order: 4 },
    ],
    estimatedDuration: 30,
    difficulty: 'beginner',
    tags: ['咖啡', '手工', '技能学习'],
  },
  {
    id: 'template-2',
    type: 'travel',
    title: '规划日本关西之旅',
    description: '计划一次完整的日本关西地区旅行',
    suggestedMilestones: [
      { title: '确定行程时间', description: '选择出行日期', order: 1 },
      { title: '规划目的地', description: '确定要去的城市和景点', order: 2 },
      { title: '预订机票酒店', description: '完成机票和住宿预订', order: 3 },
      { title: '制定详细行程', description: '规划每日行程安排', order: 4 },
      { title: '完成旅行', description: '按计划完成旅行', order: 5 },
    ],
    estimatedDuration: 60,
    difficulty: 'intermediate',
    tags: ['旅行', '日本', '文化'],
  },
];

export const useGoalStore = create<GoalState>((set, get) => ({
  // 初始状态
  goals: [],
  templates: mockTemplates,

  filter: defaultFilter,
  sortBy: 'createdAt',
  sortOrder: 'desc',

  selectedGoalId: null,

  isLoading: false,
  error: null,

  // 目标 CRUD
  setGoals: (goals) => set({ goals }),

  addGoal: (goal) =>
    set((state) => ({
      goals: [goal, ...state.goals],
    })),

  updateGoal: (goalId, updates) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === goalId
          ? { ...g, ...updates, updatedAt: new Date().toISOString() }
          : g
      ),
    })),

  deleteGoal: (goalId) =>
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== goalId),
      selectedGoalId: state.selectedGoalId === goalId ? null : state.selectedGoalId,
    })),

  // 里程碑操作
  addMilestone: (goalId, milestone) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === goalId
          ? { ...g, milestones: [...g.milestones, milestone] }
          : g
      ),
    })),

  updateMilestone: (goalId, milestoneId, updates) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === goalId
          ? {
              ...g,
              milestones: g.milestones.map((m) =>
                m.id === milestoneId ? { ...m, ...updates } : m
              ),
            }
          : g
      ),
    })),

  completeMilestone: (goalId, milestoneId) =>
    set((state) => ({
      goals: state.goals.map((g) => {
        if (g.id === goalId) {
          const updatedMilestones = g.milestones.map((m) =>
            m.id === milestoneId
              ? { ...m, isCompleted: true, completedAt: new Date().toISOString() }
              : m
          );

          // 计算新的进度
          const completedCount = updatedMilestones.filter((m) => m.isCompleted).length;
          const progress = Math.round((completedCount / updatedMilestones.length) * 100);

          return { ...g, milestones: updatedMilestones, progress };
        }
        return g;
      }),
    })),

  deleteMilestone: (goalId, milestoneId) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === goalId
          ? {
              ...g,
              milestones: g.milestones.filter((m) => m.id !== milestoneId),
            }
          : g
      ),
    })),

  // 筛选和排序
  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),

  clearFilter: () => set({ filter: defaultFilter }),

  setSortBy: (sortBy, order = 'desc') =>
    set({ sortBy, sortOrder: order }),

  // 选择
  selectGoal: (goalId) => set({ selectedGoalId: goalId }),

  // 模板
  setTemplates: (templates) => set({ templates }),

  // 数据获取
  fetchGoals: async () => {
    set({ isLoading: true, error: null });

    try {
      // TODO: 替换为真实 API
      // const goals = await goalService.getGoals();

      // Mock 数据
      const mockGoals: Goal[] = [
        {
          id: 'goal-1',
          type: 'learning',
          title: '学习咖啡拉花',
          description: '掌握基础的咖啡拉花技巧',
          status: 'in-progress',
          priority: 'high',
          createdAt: '2025-11-01T00:00:00Z',
          updatedAt: '2025-11-20T00:00:00Z',
          targetDate: '2025-12-31T00:00:00Z',
          progress: 60,
          milestones: [
            {
              id: 'm1',
              title: '学习基础理论',
              isCompleted: true,
              completedAt: '2025-11-05T00:00:00Z',
              order: 1,
            },
            {
              id: 'm2',
              title: '掌握奶泡打发',
              isCompleted: true,
              completedAt: '2025-11-15T00:00:00Z',
              order: 2,
            },
            {
              id: 'm3',
              title: '完成第一个心形',
              isCompleted: false,
              order: 3,
            },
          ],
          relatedVideos: ['video-1', 'video-2'],
          relatedNotes: ['note-1', 'note-2'],
          tags: ['咖啡', '手工'],
          isPublic: false,
        },
        {
          id: 'goal-2',
          type: 'travel',
          title: '日本关西之旅',
          description: '计划并完成日本关西地区的旅行',
          status: 'not-started',
          priority: 'medium',
          createdAt: '2025-11-10T00:00:00Z',
          updatedAt: '2025-11-10T00:00:00Z',
          targetDate: '2026-03-01T00:00:00Z',
          progress: 0,
          milestones: [],
          relatedVideos: ['video-3', 'video-4'],
          relatedNotes: [],
          tags: ['旅行', '日本'],
          isPublic: false,
        },
      ];

      set({ goals: mockGoals, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '加载目标失败',
        isLoading: false,
      });
    }
  },

  fetchTemplates: async () => {
    // 已有 mock 模板，实际使用时从 API 获取
    set({ templates: mockTemplates });
  },

  createGoalFromTemplate: async (input) => {
    const template = get().templates.find((t) => t.id === input.templateId);
    if (!template) throw new Error('模板不存在');

    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      type: input.type,
      title: input.title,
      description: input.description,
      status: 'not-started',
      priority: input.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      startDate: input.startDate,
      targetDate: input.targetDate,
      progress: 0,
      milestones: (input.milestones || template.suggestedMilestones).map((m, i) => ({
        ...m,
        id: `milestone-${Date.now()}-${i}`,
        isCompleted: false,
      })),
      relatedVideos: input.relatedVideos || [],
      relatedNotes: [],
      tags: input.tags || template.tags,
      isPublic: false,
    };

    get().addGoal(newGoal);
  },

  // Computed getters
  getFilteredGoals: () => {
    const { goals, filter, sortBy, sortOrder } = get();

    let filtered = goals;

    // 应用筛选器
    if (filter.types && filter.types.length > 0) {
      filtered = filtered.filter((g) => filter.types!.includes(g.type));
    }

    if (filter.statuses && filter.statuses.length > 0) {
      filtered = filtered.filter((g) => filter.statuses!.includes(g.status));
    }

    if (filter.priorities && filter.priorities.length > 0) {
      filtered = filtered.filter((g) => filter.priorities!.includes(g.priority));
    }

    if (filter.tags && filter.tags.length > 0) {
      filtered = filtered.filter((g) =>
        filter.tags!.some((tag) => g.tags.includes(tag))
      );
    }

    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (g) =>
          g.title.toLowerCase().includes(query) ||
          g.description?.toLowerCase().includes(query)
      );
    }

    // 排序
    filtered.sort((a, b) => {
      let aVal: any = a[sortBy];
      let bVal: any = b[sortBy];

      if (sortBy === 'createdAt' || sortBy === 'updatedAt' || sortBy === 'targetDate') {
        aVal = new Date(aVal || 0).getTime();
        bVal = new Date(bVal || 0).getTime();
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  },

  getGoalById: (goalId) => {
    return get().goals.find((g) => g.id === goalId);
  },

  getActiveGoals: () => {
    return get().goals.filter((g) => g.status === 'in-progress');
  },

  getCompletedGoals: () => {
    return get().goals.filter((g) => g.status === 'completed');
  },
}));
