// src/components/panels/ItineraryPlannerPanel.tsx
import React, { useState } from 'react';
import { GripVertical, Home, Map as MapIcon, Plus } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
    DndContext,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    useDroppable,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTripStore, Location } from '@/store/tripStore';

// --- 可复用组件 ---

const PanelHeader = ({ title }: { title: string }) => (
    <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center flex-shrink-0">
        <Link to="/" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 mr-2" aria-label="返回首页">
            <Home className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <h2 className="font-bold text-lg truncate">{title}</h2>
    </header>
);

const LocationItem = ({ location }: { location: Location }) => (
    <div className="flex items-center bg-white dark:bg-gray-900 p-2 rounded-md shadow-lg cursor-grabbing">
        <GripVertical className="h-5 w-5 text-gray-400 mr-2" />
        <div className="flex-1">
            <p className="text-sm font-medium">{location.name}</p>
            <p className="text-xs text-gray-400">来自: {location.videoSource}</p>
        </div>
    </div>
);

const SortableLocationItem = ({ location }: { location: Location }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: location.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex items-center bg-white dark:bg-gray-900 p-2 rounded-md shadow-sm cursor-grab">
            <GripVertical className="h-5 w-5 text-gray-400 mr-2" />
            <div className="flex-1">
                <p className="text-sm font-medium">{location.name}</p>
                <p className="text-xs text-gray-400">来自: {location.videoSource}</p>
            </div>
        </div>
    );
};

const DroppableContainer = ({ id, items, children }: { id: string; items: Location[]; children: React.ReactNode }) => {
    const { setNodeRef } = useDroppable({ id });
    return (
        <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
            <div ref={setNodeRef} className="space-y-2 min-h-[60px] bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md">
                {children}
                {items.length === 0 && (
                    <div className="text-center text-xs text-gray-400 py-4">拖拽地点到这里</div>
                )}
            </div>
        </SortableContext>
    );
};

// --- 默认视图组件 ---
const PlannerDefaultView = () => {
    const trips = useTripStore(state => state.trips);

    return (
        <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <PanelHeader title="我的行程概览" />
            <div className="flex-1 p-6 flex flex-col justify-center items-center text-center">
                <MapIcon className="h-16 w-16 text-blue-300 dark:text-blue-700 mb-4" />
                <h3 className="text-lg font-bold">开始规划您的旅程</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    您当前共有 <span className="font-bold text-blue-500">{trips.length}</span> 个行程计划。
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    在右侧主区域选择一个行程卡片，即可开始详细规划。
                </p>
                <button className="mt-6 flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition">
                    <Plus className="h-5 w-5" />
                    <span>创建新行程</span>
                </button>
            </div>
        </div>
    );
};


// --- 主面板组件 ---
export const ItineraryPlannerPanel: React.FC = () => {
    const { tripId } = useParams<{ tripId: string }>();
    const { findTripById, moveLocation } = useTripStore();
    const [activeId, setActiveId] = useState<string | null>(null);

    const trip = tripId ? findTripById(tripId) : null;

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    if (!trip) {
        return <PlannerDefaultView />;
    }

    const allLocations = new Map<string, Location>();
    const containers: string[] = [];
    trip.savedLocations.forEach(loc => allLocations.set(loc.id, loc));
    trip.days.forEach(day => {
        day.locations.forEach(loc => allLocations.set(loc.id, loc));
    });
    containers.push('saved', ...trip.days.map(d => d.id));


    const findContainerId = (id: string) => {
        if (trip.savedLocations.some(loc => loc.id === id)) return 'saved';
        for (const day of trip.days) {
            if (day.locations.some(loc => loc.id === id)) return day.id;
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || !tripId) {
            setActiveId(null);
            return;
        }

        const activeContainerId = findContainerId(active.id as string);
        const overId = over.id as string;
        const overContainerId = containers.includes(overId) ? overId : findContainerId(overId);

        if (!activeContainerId || !overContainerId) {
            setActiveId(null);
            return;
        }

        const activeContainer = activeContainerId === 'saved' ? trip.savedLocations : trip.days.find(d => d.id === activeContainerId)?.locations;
        const overContainer = overContainerId === 'saved' ? trip.savedLocations : trip.days.find(d => d.id === overContainerId)?.locations;
        if(!activeContainer || !overContainer) return;

        const activeIndex = activeContainer.findIndex((item) => item.id === active.id);
        let overIndex = overContainer.findIndex((item) => item.id === overId);
        if (overIndex < 0) {
            overIndex = overContainer.length;
        }

        if (activeContainerId !== overContainerId) {
            moveLocation(
                tripId,
                activeContainerId,
                overContainerId,
                activeIndex,
                overIndex
            );
        } else if (activeIndex !== overIndex) {
            moveLocation(
                tripId,
                activeContainerId,
                overContainerId,
                activeIndex,
                overIndex
            );
        }

        setActiveId(null);
    };

    const activeItem = activeId ? allLocations.get(activeId) : null;

    return (
        <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <PanelHeader title={trip.title} />
            <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <section>
                        <h3 className="text-sm font-semibold mb-2">已收藏的地点</h3>
                        <DroppableContainer id="saved" items={trip.savedLocations}>
                            {trip.savedLocations.map((loc) => <SortableLocationItem key={loc.id} location={loc} />)}
                        </DroppableContainer>
                    </section>
                    <section>
                        <h3 className="text-sm font-semibold mb-2">每日行程</h3>
                        <div className="space-y-4">
                            {trip.days.map(day => (
                                <div key={day.id} className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                                    <h4 className="font-bold text-sm mb-2">{day.title}</h4>
                                    <DroppableContainer id={day.id} items={day.locations}>
                                        {day.locations.map(loc => <SortableLocationItem key={loc.id} location={loc} />)}
                                    </DroppableContainer>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <DragOverlay>{activeItem ? <LocationItem location={activeItem} /> : null}</DragOverlay>
            </DndContext>
        </div>
    );
};