// src/types/stats.types.ts
// 统计数据相关类型定义

/**
 * 时间范围
 */
export type TimeRange =
  | 'today'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
  | 'all-time'
  | 'custom';

/**
 * 自定义时间范围
 */
export interface CustomTimeRange {
  startDate: string;
  endDate: string;
}

/**
 * 统计数据请求参数
 */
export interface StatsQuery {
  timeRange: TimeRange;
  customRange?: CustomTimeRange;
  granularity?: 'hour' | 'day' | 'week' | 'month';
}

/**
 * 综合统计数据
 */
export interface OverallStats {
  video: VideoStats;
  knowledge: KnowledgeStats;
  goals: GoalStats;
  habits: HabitStats;
  creation: CreationStats;
}

/**
 * 视频统计
 */
export interface VideoStats {
  totalWatchTime: number;           // 总观看时长（分钟）
  totalVideos: number;              // 观看视频总数
  averageSessionTime: number;       // 平均单次观看时长
  completionRate: number;           // 完成率（看完的视频比例）

  // 分类统计
  byCategory: {
    category: string;
    count: number;
    watchTime: number;
  }[];

  // 时间分布
  byTimeOfDay: {
    hour: number;
    count: number;
    watchTime: number;
  }[];

  // 趋势
  trend: {
    date: string;
    watchTime: number;
    videoCount: number;
  }[];

  // 情绪分布
  emotionDistribution: {
    emotion: string;
    count: number;
    percentage: number;
  }[];
}

/**
 * 知识统计
 */
export interface KnowledgeStats {
  totalNotes: number;
  totalTags: number;
  totalConnections: number;         // 笔记连接数
  averageNotesPerVideo: number;

  // 增长趋势
  growthTrend: {
    date: string;
    noteCount: number;
    newTags: number;
  }[];

  // 标签统计
  tagDistribution: {
    tag: string;
    count: number;
    recentUse: number;              // 最近使用次数
  }[];

  // 笔记质量指标
  qualityMetrics: {
    averageLength: number;
    withTimestamps: number;
    withTags: number;
    withConnections: number;
  };
}

/**
 * 目标统计
 */
export interface GoalStats {
  totalGoals: number;
  activeGoals: number;
  completedGoals: number;
  completionRate: number;

  // 按类型统计
  byType: {
    type: string;
    count: number;
    completed: number;
  }[];

  // 按状态统计
  byStatus: {
    status: string;
    count: number;
  }[];

  // 完成趋势
  completionTrend: {
    date: string;
    completed: number;
    created: number;
  }[];

  // 平均完成时间
  averageCompletionTime: number;    // 天数

  // 进度分布
  progressDistribution: {
    range: string;                  // '0-25', '26-50', '51-75', '76-100'
    count: number;
  }[];
}

/**
 * 习惯统计
 */
export interface HabitStats {
  totalHabits: number;
  activeHabits: number;
  currentStreak: number;
  longestStreak: number;
  overallCompletionRate: number;

  // 习惯详情
  habits: {
    id: string;
    name: string;
    completionRate: number;
    currentStreak: number;
    longestStreak: number;
  }[];

  // 完成趋势
  completionTrend: {
    date: string;
    completedCount: number;
    totalCount: number;
  }[];
}

/**
 * 创作统计
 */
export interface CreationStats {
  totalCreations: number;
  articlesWritten: number;
  videosCreated: number;
  collectionsCreated: number;

  // 创作趋势
  creationTrend: {
    date: string;
    count: number;
    type: string;
  }[];

  // 创作质量
  qualityMetrics: {
    averageLength: number;
    withImages: number;
    published: number;
  };
}

/**
 * 对比数据（与上一周期对比）
 */
export interface ComparisonData<T> {
  current: T;
  previous: T;
  change: number;                   // 变化百分比
  trend: 'up' | 'down' | 'stable';
}

/**
 * 排行榜数据
 */
export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  rank: number;
  score: number;
  metric: string;                   // 排行依据的指标
}

/**
 * 成就数据
 */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  requirement: number;
  category: 'video' | 'knowledge' | 'goal' | 'habit' | 'social' | 'creation';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}
