// src/types/insight.types.ts
// AI 洞察相关类型定义

/**
 * 洞察来源
 */
export type InsightSource =
  | 'ai-analysis'       // AI 分析
  | 'pattern-detection' // 模式检测
  | 'user-behavior'     // 用户行为
  | 'community'         // 社区数据
  | 'manual';          // 手动添加

/**
 * 洞察优先级
 */
export type InsightPriority = 'critical' | 'high' | 'medium' | 'low';

/**
 * 洞察类别
 */
export type InsightCategory =
  | 'learning-pattern'      // 学习模式
  | 'content-recommendation'// 内容推荐
  | 'goal-suggestion'       // 目标建议
  | 'habit-insight'         // 习惯洞察
  | 'productivity'          // 生产力
  | 'achievement'           // 成就
  | 'warning'              // 警告
  | 'opportunity';         // 机会

/**
 * 洞察
 */
export interface Insight {
  id: string;
  category: InsightCategory;
  title: string;
  description: string;
  source: InsightSource;
  priority: InsightPriority;

  // 时间相关
  createdAt: string;
  expiresAt?: string;

  // 状态
  isRead: boolean;
  isDismissed: boolean;

  // 数据支持
  evidence?: InsightEvidence;

  // 建议行动
  suggestedActions?: SuggestedAction[];

  // 可视化数据
  visualData?: {
    type: 'chart' | 'graph' | 'heatmap' | 'timeline';
    data: any;
  };

  // 关联资源
  relatedItems?: {
    type: 'video' | 'note' | 'goal' | 'path';
    id: string;
    title: string;
  }[];
}

/**
 * 洞察证据
 */
export interface InsightEvidence {
  dataPoints: {
    label: string;
    value: number | string;
    comparison?: {
      value: number | string;
      change: number;
    };
  }[];
  confidence: number;               // 0-100，置信度
  sampleSize?: number;
  timeframe?: string;
}

/**
 * 建议行动
 */
export interface SuggestedAction {
  id: string;
  label: string;
  description?: string;
  type: 'navigation' | 'creation' | 'external' | 'custom';
  action: {
    type: string;
    params: Record<string, any>;
  };
  isPrimary?: boolean;
  icon?: string;
}

/**
 * 学习模式洞察
 */
export interface LearningPatternInsight extends Insight {
  pattern: {
    type: 'peak-time' | 'learning-style' | 'content-preference' | 'pace';
    description: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    strength: number;               // 0-100，模式强度
  };
}

/**
 * 内容推荐洞察
 */
export interface ContentRecommendationInsight extends Insight {
  recommendations: {
    videoId: string;
    title: string;
    thumbnail: string;
    reason: string;
    relevanceScore: number;         // 0-100
    tags: string[];
  }[];
}

/**
 * 目标建议洞察
 */
export interface GoalSuggestionInsight extends Insight {
  suggestedGoal: {
    type: string;
    title: string;
    description: string;
    estimatedDuration: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    reasoning: string;
  };
}

/**
 * 习惯洞察
 */
export interface HabitInsight extends Insight {
  habitId?: string;
  habitName?: string;
  insights: {
    type: 'streak' | 'best-time' | 'correlation' | 'suggestion';
    message: string;
    data?: any;
  }[];
}

/**
 * 生产力洞察
 */
export interface ProductivityInsight extends Insight {
  metrics: {
    focusTime: number;
    distractionTime: number;
    optimalTime: string;
    productivityScore: number;      // 0-100
  };
  trends: {
    date: string;
    score: number;
  }[];
}

/**
 * 警告洞察
 */
export interface WarningInsight extends Insight {
  severity: 'info' | 'warning' | 'critical';
  issue: string;
  impact: string;
  recommendedActions: string[];
}

/**
 * 洞察筛选器
 */
export interface InsightFilter {
  categories?: InsightCategory[];
  priorities?: InsightPriority[];
  sources?: InsightSource[];
  isRead?: boolean;
  isDismissed?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

/**
 * 洞察设置
 */
export interface InsightSettings {
  enabledCategories: InsightCategory[];
  notificationPreferences: {
    category: InsightCategory;
    enabled: boolean;
    minPriority: InsightPriority;
  }[];
  analysisFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  privacyLevel: 'full' | 'limited' | 'minimal';
}

/**
 * 洞察生成请求
 */
export interface GenerateInsightRequest {
  userId: string;
  categories?: InsightCategory[];
  timeRange?: {
    start: string;
    end: string;
  };
  context?: Record<string, any>;
}

/**
 * 洞察生成响应
 */
export interface GenerateInsightResponse {
  insights: Insight[];
  generatedAt: string;
  nextGenerationAt?: string;
}
