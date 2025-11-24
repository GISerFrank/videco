// src/components/hub/insights/InsightsPanel.tsx
import React from 'react';
import { useInsightsStore } from '@/store/insightsStore';
import { Lightbulb, X, TrendingUp, AlertCircle } from 'lucide-react';

/**
 * AI 洞察面板
 * 展示个性化的 AI 洞察和建议
 */
export const InsightsPanel: React.FC = () => {
  const { insights, markAsRead, dismiss } = useInsightsStore();

  // 只显示未忽略的前3条洞察
  const displayInsights = insights
    .filter((i) => !i.isDismissed)
    .slice(0, 3);

  if (displayInsights.length === 0) {
    return null;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
      case 'critical':
        return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'medium':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-800/50';
    }
  };

  const getIconByCategory = (category: string) => {
    switch (category) {
      case 'learning-pattern':
        return <TrendingUp className="h-5 w-5" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          AI 洞察
        </h2>
      </div>

      {displayInsights.map((insight) => (
        <div
          key={insight.id}
          className={`
            p-4 rounded-lg border-l-4 transition-all
            ${getPriorityColor(insight.priority)}
          `}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className="text-blue-600 dark:text-blue-400 mt-0.5">
                {getIconByCategory(insight.category)}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {insight.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {insight.description}
                </p>

                {/* 证据数据 */}
                {insight.evidence && (
                  <div className="mt-2 space-y-1">
                    {insight.evidence.dataPoints.map((point, index) => (
                      <div
                        key={index}
                        className="text-xs text-gray-500 dark:text-gray-400"
                      >
                        • {point.label}: <strong>{point.value}</strong>
                      </div>
                    ))}
                  </div>
                )}

                {/* 建议操作 */}
                {insight.suggestedActions && insight.suggestedActions.length > 0 && (
                  <div className="mt-3 flex items-center space-x-2">
                    {insight.suggestedActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => {
                          // TODO: 执行操作
                          console.log('Execute action:', action);
                          markAsRead(insight.id);
                        }}
                        className={`
                          px-3 py-1 text-xs rounded-md transition-colors
                          ${
                            action.isPrimary
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }
                        `}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 关闭按钮 */}
            <button
              onClick={() => dismiss(insight.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
