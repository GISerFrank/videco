// src/types/hub.types.ts
// 个人中心相关类型定义

/**
 * 仪表板小组件类型
 */
export type WidgetType =
  | 'video-consumption'     // 视频消费统计
  | 'knowledge-growth'      // 知识增长
  | 'goal-progress'         // 目标进度
  | 'habit-tracker'         // 习惯追踪
  | 'emotion-curve'         // 情绪曲线
  | 'tag-cloud'            // 标签云
  | 'quick-actions';       // 快捷操作

/**
 * 小组件配置
 */
export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isVisible: boolean;
  config?: Record<string, any>;
}

/**
 * 视频消费统计
 */
export interface VideoConsumptionStats {
  totalWatchTime: number;           // 总观看时长（分钟）
  videosWatched: number;            // 观看视频数量
  averageWatchTime: number;         // 平均观看时长
  mostWatchedCategory: string;      // 最常观看的分类
  watchTimeByCategory: CategoryStats[];
  watchTimeByDay: DayStats[];
  currentStreak: number;            // 连续观看天数
  longestStreak: number;            // 最长连续天数
}

export interface CategoryStats {
  category: string;
  watchTime: number;
  percentage: number;
  videoCount: number;
}

export interface DayStats {
  date: string;                     // YYYY-MM-DD
  watchTime: number;
  videoCount: number;
  dominantEmotion?: EmotionType;
}

/**
 * 情绪类型
 */
export type EmotionType =
  | 'relaxation'    // 放松
  | 'focus'         // 专注
  | 'inspiration'   // 启发
  | 'healing'       // 治愈
  | 'energizing';   // 充能

/**
 * 情绪统计
 */
export interface EmotionStats {
  date: string;
  emotions: Record<EmotionType, number>;
}

/**
 * 知识增长统计
 */
export interface KnowledgeGrowthStats {
  totalNotes: number;               // 总笔记数
  totalTags: number;                // 总标签数
  notesThisWeek: number;            // 本周新增笔记
  notesThisMonth: number;           // 本月新增笔记
  growthTrend: GrowthTrendData[];   // 增长趋势
  topTags: TagStats[];              // 热门标签
  knowledgeDensity: number;         // 知识密度（笔记数/视频数）
}

export interface GrowthTrendData {
  date: string;
  noteCount: number;
  tagCount: number;
}

export interface TagStats {
  tag: string;
  count: number;
  growth: number;                   // 增长百分比
}

/**
 * 习惯追踪数据
 */
export interface HabitData {
  id: string;
  name: string;
  description?: string;
  targetFrequency: 'daily' | 'weekly' | 'custom';
  targetCount?: number;
  currentStreak: number;
  longestStreak: number;
  completionHistory: HabitCompletion[];
  relatedGoalId?: string;
}

export interface HabitCompletion {
  date: string;
  completed: boolean;
  note?: string;
}

/**
 * 时间线活动类型
 */
export type ActivityType =
  | 'video-watched'       // 观看视频
  | 'note-created'        // 创建笔记
  | 'goal-created'        // 创建目标
  | 'goal-completed'      // 完成目标
  | 'milestone-reached'   // 达成里程碑
  | 'habit-completed'     // 完成习惯
  | 'trip-created'        // 创建旅行
  | 'content-created';    // 创作内容

/**
 * 时间线活动
 */
export interface TimelineActivity {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  timestamp: string;
  metadata?: {
    videoId?: string;
    videoTitle?: string;
    noteId?: string;
    goalId?: string;
    tags?: string[];
    thumbnail?: string;
  };
}

/**
 * AI 洞察类型
 */
export type InsightType =
  | 'recommendation'      // 推荐
  | 'pattern'            // 模式发现
  | 'suggestion'         // 建议
  | 'achievement'        // 成就
  | 'warning';           // 提醒

/**
 * AI 洞察
 */
export interface Insight {
  id: string;
  type: InsightType;
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  isRead: boolean;
  actionable?: {
    label: string;
    action: string;
    params?: Record<string, any>;
  };
}

/**
 * 个人中心仪表板状态
 */
export interface DashboardState {
  widgets: WidgetConfig[];
  lastUpdated: string;
  isLoading: boolean;
}
