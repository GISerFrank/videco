// src/components/modals/FlowStateSetupModal.tsx
import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. 导入 useNavigate

const moods = ['😊 放松', '🚀 专注', '💡 灵感', '🥳 治愈', '🔥 燃'];
const durations = ['15分钟', '30分钟', '45分钟', '1小时'];

export const FlowStateSetupModal: React.FC = () => {
    const { closeModal } = useAppStore();
    const navigate = useNavigate(); // 2. 获取 navigate 函数

    const [targetMood, setTargetMood] = useState<string>('😊 放松');
    const [duration, setDuration] = useState<string>('30分钟');

    const handleStartFlow = () => {
        // 3. 定义跳转逻辑
        closeModal(); // 首先关闭模态框
        // 然后跳转到 /flow 页面，并通过 state 传递参数
        navigate('/flow', {
            state: {
                targetMood,
                duration
            }
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all">
            <button onClick={closeModal} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <X size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-2">开启一段心流旅程</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">告诉我们你的感受，我们将为你定制一段专属的观看体验。</p>

            <div className="space-y-6">
                <div>
                    <label className="text-sm font-semibold block mb-2">我希望感觉...</label>
                    <div className="flex flex-wrap justify-center gap-2">
                        {moods.map(mood => (
                            <button key={mood} onClick={() => setTargetMood(mood)} className={`px-4 py-2 rounded-full text-sm transition ${targetMood === mood ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200'}`}>
                                {mood}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="text-sm font-semibold block mb-2">投入时间...</label>
                    <div className="flex flex-wrap justify-center gap-2">
                        {durations.map(d => (
                            <button key={d} onClick={() => setDuration(d)} className={`px-4 py-2 rounded-full text-sm transition ${duration === d ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200'}`}>
                                {d}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. 绑定新的点击事件 */}
            <button onClick={handleStartFlow} className="w-full mt-8 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2">
                <span>开始心流</span>
                <ArrowRight size={18} />
            </button>
        </div>
    );
};