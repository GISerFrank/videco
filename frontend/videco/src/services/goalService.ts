// src/services/goalService.ts
import axios from 'axios';
import {
  Goal,
  GoalTemplate,
  CreateGoalInput,
  UpdateGoalInput,
  Milestone,
} from '@/types/goal.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 目标管理服务
 */
export const goalService = {
  /**
   * 获取所有目标
   */
  async getGoals(): Promise<Goal[]> {
    // const response = await api.get('/goals');
    // return response.data;

    // Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
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
            ],
            relatedVideos: [],
            relatedNotes: [],
            tags: ['咖啡', '手工'],
            isPublic: false,
          },
        ]);
      }, 500);
    });
  },

  /**
   * 根据 ID 获取目标
   */
  async getGoalById(goalId: string): Promise<Goal> {
    // const response = await api.get(`/goals/${goalId}`);
    // return response.data;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock: 简单返回一个目标
        resolve({
          id: goalId,
          type: 'learning',
          title: '学习咖啡拉花',
          description: '掌握基础的咖啡拉花技巧',
          status: 'in-progress',
          priority: 'high',
          createdAt: '2025-11-01T00:00:00Z',
          updatedAt: '2025-11-20T00:00:00Z',
          progress: 60,
          milestones: [],
          relatedVideos: [],
          relatedNotes: [],
          tags: [],
          isPublic: false,
        });
      }, 300);
    });
  },

  /**
   * 创建新目标
   */
  async createGoal(input: CreateGoalInput): Promise<Goal> {
    // const response = await api.post('/goals', input);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
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
          milestones: (input.milestones || []).map((m, i) => ({
            ...m,
            id: `milestone-${Date.now()}-${i}`,
            isCompleted: false,
          })),
          relatedVideos: input.relatedVideos || [],
          relatedNotes: [],
          tags: input.tags || [],
          isPublic: false,
        };
        resolve(newGoal);
      }, 300);
    });
  },

  /**
   * 更新目标
   */
  async updateGoal(goalId: string, updates: UpdateGoalInput): Promise<Goal> {
    // const response = await api.patch(`/goals/${goalId}`, updates);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: goalId,
          ...updates,
          updatedAt: new Date().toISOString(),
        } as Goal);
      }, 300);
    });
  },

  /**
   * 删除目标
   */
  async deleteGoal(goalId: string): Promise<void> {
    // await api.delete(`/goals/${goalId}`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  },

  /**
   * 完成目标
   */
  async completeGoal(goalId: string): Promise<Goal> {
    // const response = await api.post(`/goals/${goalId}/complete`);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: goalId,
          status: 'completed',
          progress: 100,
          completedAt: new Date().toISOString(),
        } as Goal);
      }, 300);
    });
  },

  /**
   * 添加里程碑
   */
  async addMilestone(goalId: string, milestone: Omit<Milestone, 'id'>): Promise<Milestone> {
    // const response = await api.post(`/goals/${goalId}/milestones`, milestone);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...milestone,
          id: `milestone-${Date.now()}`,
          isCompleted: false,
        });
      }, 300);
    });
  },

  /**
   * 更新里程碑
   */
  async updateMilestone(
    goalId: string,
    milestoneId: string,
    updates: Partial<Milestone>
  ): Promise<Milestone> {
    // const response = await api.patch(`/goals/${goalId}/milestones/${milestoneId}`, updates);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: milestoneId,
          ...updates,
        } as Milestone);
      }, 300);
    });
  },

  /**
   * 完成里程碑
   */
  async completeMilestone(goalId: string, milestoneId: string): Promise<Milestone> {
    // const response = await api.post(`/goals/${goalId}/milestones/${milestoneId}/complete`);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: milestoneId,
          isCompleted: true,
          completedAt: new Date().toISOString(),
        } as Milestone);
      }, 300);
    });
  },

  /**
   * 获取目标模板
   */
  async getTemplates(): Promise<GoalTemplate[]> {
    // const response = await api.get('/goals/templates');
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'template-1',
            type: 'learning',
            title: '学习咖啡拉花',
            description: '通过观看视频教程和实践，掌握基础咖啡拉花技巧',
            suggestedMilestones: [
              { title: '学习基础理论', order: 1 },
              { title: '掌握奶泡打发', order: 2 },
              { title: '完成第一个心形', order: 3 },
            ],
            estimatedDuration: 30,
            difficulty: 'beginner',
            tags: ['咖啡', '手工'],
          },
        ]);
      }, 300);
    });
  },

  /**
   * 关联视频到目标
   */
  async linkVideo(goalId: string, videoId: string): Promise<void> {
    // await api.post(`/goals/${goalId}/videos`, { videoId });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  },

  /**
   * 取消关联视频
   */
  async unlinkVideo(goalId: string, videoId: string): Promise<void> {
    // await api.delete(`/goals/${goalId}/videos/${videoId}`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  },
};
