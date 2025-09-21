// src/pages/TripPlannerPage.tsx
import React from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTripStore, Trip } from '@/store/tripStore'; // 1. 导入Store和类型

// 单个行程卡片组件
const TripCard = ({ trip }: { trip: Trip }) => {
    return (
        <Link to={`/trip-planner/${trip.id}`} className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 h-full">
                <img src={trip.coverImage} alt={trip.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{trip.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{trip.duration} · {trip.locationsCount} 个地点</p>
                        </div>
                        <div className="p-2">
                            <MoreVertical className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// 行程规划器主页面
export const TripPlannerPage: React.FC = () => {
    const trips = useTripStore(state => state.trips); // 2. 从Store中获取行程列表

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">我的行程</h1>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition">
                    <Plus className="h-5 w-5" />
                    <span>创建新行程</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                ))}
            </div>
        </div>
    );
};