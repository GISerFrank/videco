// src/store/tripStore.ts
import { create } from 'zustand';
import { arrayMove } from '@dnd-kit/sortable';

// --- 1. 定义我们的数据结构 ---
export interface Location {
    id: string;
    name: string;
    videoSource: string;
}

export interface DayPlan {
    id: string; // e.g., 'day-1'
    title: string;
    locations: Location[];
}

export interface Trip {
    id: string;
    title: string;
    duration: string;
    locationsCount: number;
    coverImage: string;
    savedLocations: Location[];
    days: DayPlan[];
}

interface TripState {
    trips: Trip[];
    findTripById: (tripId: string) => Trip | undefined;
    moveLocation: (
        tripId: string,
        activeContainerId: string,
        overContainerId: string,
        activeIndex: number,
        overIndex: number
    ) => void;
}

// --- 2. 创建带有模拟数据的 Store ---
const mockTrips: Trip[] = [
    {
        id: 'trip1',
        title: '东京动漫文化之旅',
        duration: '7 天',
        locationsCount: 12,
        coverImage: 'https://placehold.co/600x400/3498db/ffffff?text=Tokyo',
        savedLocations: [
            { id: 'loc1', name: '三鹰之森吉卜力美术馆', videoSource: '东京Vlog' },
            { id: 'loc3', name: '涩谷十字路口', videoSource: '东京Vlog' },
            { id: 'loc4', name: '秋叶原电器街', videoSource: '动漫之旅' },
        ],
        days: [
            {
                id: 'day-1',
                title: 'Day 1: 动漫巡礼',
                locations: [],
            },
            {
                id: 'day-2',
                title: 'Day 2: 城市探索',
                locations: [],
            },
        ],
    },
    {
        id: 'trip2',
        title: '关西自然与古都探索',
        duration: '5 天',
        locationsCount: 8,
        coverImage: 'https://placehold.co/600x400/2ecc71/ffffff?text=Kyoto',
        savedLocations: [
            { id: 'loc2', name: '京都清水寺', videoSource: '关西之旅' },
            { id: 'loc5', name: '奈良公园', videoSource: '古都漫步' },
        ],
        days: [
            {
                id: 'day-1',
                title: 'Day 1: 古寺巡游',
                locations: [],
            },
        ],
    },
];


export const useTripStore = create<TripState>((set, get) => ({
    trips: mockTrips,

    findTripById: (tripId) => {
        return get().trips.find(trip => trip.id === tripId);
    },

    moveLocation: (tripId, activeContainerId, overContainerId, activeIndex, overIndex) => {
        set((state) => {
            const tripIndex = state.trips.findIndex(t => t.id === tripId);
            if (tripIndex === -1) return state; // Trip not found

            const newTrips = [...state.trips];
            const tripToUpdate = { ...newTrips[tripIndex] };

            const findContainer = (containerId: string): Location[] | undefined => {
                if (containerId === 'saved') return tripToUpdate.savedLocations;
                return tripToUpdate.days.find(d => d.id === containerId)?.locations;
            };

            const activeContainer = findContainer(activeContainerId);
            const overContainer = findContainer(overContainerId);

            if (!activeContainer || !overContainer) return state; // Container not found

            if (activeContainerId === overContainerId) {
                // 在同一容器内排序
                const newLocations = arrayMove(activeContainer, activeIndex, overIndex);
                if (activeContainerId === 'saved') {
                    tripToUpdate.savedLocations = newLocations;
                } else {
                    const dayIndex = tripToUpdate.days.findIndex(d => d.id === activeContainerId);
                    tripToUpdate.days[dayIndex].locations = newLocations;
                }
            } else {
                // 在不同容器间移动
                const [movedItem] = activeContainer.splice(activeIndex, 1);
                overContainer.splice(overIndex, 0, movedItem);
            }

            newTrips[tripIndex] = tripToUpdate;
            return { trips: newTrips };
        });
    },
}));