// src/types/goal.types.ts
// 目标管理相关类型定义

/**
 * 目标类型
 */
export type GoalType =
  | 'learning'      // 学习目标
  | 'skill'         // 技能目标
  | 'travel'        // 旅行目标
  | 'habit'         // 习惯目标
  | 'creation'      // 创作目标
  | 'custom';       // 自定义目标

/**
 * 目标状态
 */
export type GoalStatus =
  | 'not-started'   // 未开始
  | 'in-progress'   // 进行中
  | 'completed'     // 已完成
  | 'paused'        // 已暂停
  | 'archived';     // 已归档

/**
 * 目标优先级
 */
export type GoalPriority = 'high' | 'medium' | 'low';

/**
 * 目标
 */
export interface Goal {
  id: string;
  type: GoalType;
  title: string;
  description?: string;
  status: GoalStatus;
  priority: GoalPriority;

  // 时间相关
  createdAt: string;
  updatedAt: string;
  startDate?: string;
  targetDate?: string;
  completedAt?: string;

  // 进度相关
  progress: number;                 // 0-100
  milestones: Milestone[];

  // 关联资源
  relatedVideos: string[];          // 视频 ID 列表
  relatedNotes: string[];           // 笔记 ID 列表
  relatedPaths?: string[];          // 学习路径 ID

  // 追踪指标
  metrics?: GoalMetrics;

  // 标签和分类
  tags: string[];
  category?: string;

  // 其他
  isPublic: boolean;                // 是否公开
  shareUrl?: string;
}

/**
 * 里程碑
 */
export interface Milestone {
  id: string;
  title: string;
  description?: string;
  targetDate?: string;
  completedAt?: string;
  isCompleted: boolean;
  order: number;
}

/**
 * 目标指标
 */
export interface GoalMetrics {
  targetValue?: number;
  currentValue?: number;
  unit?: string;

  // 时间追踪
  timeSpent?: number;               // 已投入时间（分钟）
  estimatedTime?: number;           // 预计所需时间

  // 行为追踪
  videosWatched?: number;
  notesCreated?: number;
  practiceCount?: number;
}

/**
 * 目标模板
 */
export interface GoalTemplate {
  id: string;
  type: GoalType;
  title: string;
  description: string;
  suggestedMilestones: Omit<Milestone, 'id' | 'completedAt' | 'isCompleted'>[];
  suggestedMetrics?: Partial<GoalMetrics>;
  estimatedDuration?: number;       // 天数
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

/**
 * 目标筛选器
 */
export interface GoalFilter {
  types?: GoalType[];
  statuses?: GoalStatus[];
  priorities?: GoalPriority[];
  tags?: string[];
  searchQuery?: string;
}

/**
 * 目标排序
 */
export type GoalSortBy =
  | 'createdAt'
  | 'updatedAt'
  | 'targetDate'
  | 'progress'
  | 'priority';

/**
 * 目标创建输入
 */
export interface CreateGoalInput {
  type: GoalType;
  title: string;
  description?: string;
  priority: GoalPriority;
  startDate?: string;
  targetDate?: string;
  milestones?: Omit<Milestone, 'id' | 'completedAt' | 'isCompleted'>[];
  tags?: string[];
  relatedVideos?: string[];
  templateId?: string;
}

/**
 * 目标更新输入
 */
export interface UpdateGoalInput {
  title?: string;
  description?: string;
  status?: GoalStatus;
  priority?: GoalPriority;
  targetDate?: string;
  progress?: number;
  tags?: string[];
  metrics?: Partial<GoalMetrics>;
}
