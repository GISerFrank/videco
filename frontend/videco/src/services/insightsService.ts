// src/services/insightsService.ts
import axios from 'axios';
import {
  Insight,
  InsightFilter,
  GenerateInsightRequest,
  GenerateInsightResponse,
  InsightSettings,
} from '@/types/insight.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * AI 洞察服务
 */
export const insightsService = {
  /**
   * 获取洞察列表
   */
  async getInsights(filter?: InsightFilter): Promise<Insight[]> {
    // const response = await api.get('/insights', { params: filter });
    // return response.data;

    // Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'insight-1',
            category: 'learning-pattern',
            title: '你在晚上 8-10 点学习效率最高',
            description: '基于过去 30 天的数据分析，你在晚上 8-10 点观看学习类视频时完成率最高（92%）',
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
          },
          {
            id: 'insight-2',
            category: 'content-recommendation',
            title: '为你推荐：日本传统工艺系列',
            description: '根据你最近对日本旅行和手工艺的兴趣，我们为你精选了一组关于日本传统工艺的视频',
            source: 'ai-analysis',
            priority: 'medium',
            createdAt: new Date().toISOString(),
            isRead: false,
            isDismissed: false,
          },
        ]);
      }, 500);
    });
  },

  /**
   * 根据 ID 获取洞察
   */
  async getInsightById(insightId: string): Promise<Insight> {
    // const response = await api.get(`/insights/${insightId}`);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: insightId,
          category: 'learning-pattern',
          title: '示例洞察',
          description: '这是一个示例洞察',
          source: 'ai-analysis',
          priority: 'medium',
          createdAt: new Date().toISOString(),
          isRead: false,
          isDismissed: false,
        });
      }, 300);
    });
  },

  /**
   * 生成新的洞察
   */
  async generateInsights(request: GenerateInsightRequest): Promise<GenerateInsightResponse> {
    // const response = await api.post('/insights/generate', request);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          insights: [
            {
              id: `insight-${Date.now()}`,
              category: 'learning-pattern',
              title: 'AI 生成的新洞察',
              description: '基于最新数据分析生成的洞察',
              source: 'ai-analysis',
              priority: 'medium',
              createdAt: new Date().toISOString(),
              isRead: false,
              isDismissed: false,
            },
          ],
          generatedAt: new Date().toISOString(),
          nextGenerationAt: new Date(Date.now() + 86400000).toISOString(),
        });
      }, 2000);
    });
  },

  /**
   * 标记洞察为已读
   */
  async markAsRead(insightId: string): Promise<void> {
    // await api.patch(`/insights/${insightId}/read`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  },

  /**
   * 批量标记为已读
   */
  async batchMarkAsRead(insightIds: string[]): Promise<void> {
    // await api.post('/insights/batch-read', { insightIds });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  },

  /**
   * 忽略洞察
   */
  async dismiss(insightId: string): Promise<void> {
    // await api.patch(`/insights/${insightId}/dismiss`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  },

  /**
   * 批量忽略
   */
  async batchDismiss(insightIds: string[]): Promise<void> {
    // await api.post('/insights/batch-dismiss', { insightIds });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  },

  /**
   * 获取洞察设置
   */
  async getSettings(): Promise<InsightSettings> {
    // const response = await api.get('/insights/settings');
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
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
        });
      }, 300);
    });
  },

  /**
   * 更新洞察设置
   */
  async updateSettings(settings: Partial<InsightSettings>): Promise<InsightSettings> {
    // const response = await api.patch('/insights/settings', settings);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(settings as InsightSettings);
      }, 300);
    });
  },

  /**
   * 执行洞察建议的操作
   */
  async executeAction(insightId: string, actionId: string): Promise<void> {
    // await api.post(`/insights/${insightId}/actions/${actionId}/execute`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  },

  /**
   * 对洞察提供反馈
   */
  async provideFeedback(
    insightId: string,
    feedback: { helpful: boolean; comment?: string }
  ): Promise<void> {
    // await api.post(`/insights/${insightId}/feedback`, feedback);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  },
};
