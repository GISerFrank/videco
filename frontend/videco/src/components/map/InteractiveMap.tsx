// src/components/map/InteractiveMap.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useTripStore } from '@/store/tripStore';
import { useParams } from 'react-router-dom';
import L from 'leaflet';

// --- 1. 创建自定义的SVG图标 ---

// 灰色图标，用于“已收藏”但未规划的地点
const greyIcon = new L.DivIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-gray-500">
             <path fill-rule="evenodd" d="M11.54 22.35a.75.75 0 01-1.08 0l-6.75-6.75a.75.75 0 011.08-1.08L9 18.19l9.97-9.97a.75.75 0 011.08 1.08l-11.25 11.25z" clip-rule="evenodd" />
             <path d="M12 2.25a.75.75 0 01.75.75v16.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75z" />
             <path d="M12 2.25a5.25 5.25 0 00-5.25 5.25c0 3.111 2.234 5.733 5.25 5.733s5.25-2.622 5.25-5.733A5.25 5.25 0 0012 2.25zm0 9a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
           </svg>`,
    className: 'bg-transparent border-0',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
});

// 蓝色图标，用于已规划到每日行程的地点
const blueIcon = new L.DivIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-blue-600">
             <path fill-rule="evenodd" d="M11.54 22.35a.75.75 0 01-1.08 0l-6.75-6.75a.75.75 0 011.08-1.08L9 18.19l9.97-9.97a.75.75 0 011.08 1.08l-11.25 11.25z" clip-rule="evenodd" />
             <path d="M12 2.25a.75.75 0 01.75.75v16.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75z" />
             <path d="M12 2.25a5.25 5.25 0 00-5.25 5.25c0 3.111 2.234 5.733 5.25 5.733s5.25-2.622 5.25-5.733A5.25 5.25 0 0012 2.25zm0 9a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
           </svg>`,
    className: 'bg-transparent border-0',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
});


export const InteractiveMap: React.FC = () => {
    const { tripId } = useParams<{ tripId: string }>();
    const { findTripById } = useTripStore();
    const trip = findTripById(tripId || '');

    // 注意：这里的坐标是硬编码的
    const locationCoordinates: Record<string, [number, number]> = {
        'loc1': [35.6608, 139.5704], // 三鹰之森
        'loc3': [35.6595, 139.7005], // 涩谷
        'loc4': [35.6984, 139.7731], // 秋叶原
        'loc2': [34.9949, 135.7850], // 清水寺
        'loc5': [34.6851, 135.8444], // 奈良公园
    };

    if (!trip) {
        return <div>加载地图失败...</div>;
    }

    const mapCenter: [number, number] = [35.6895, 139.6917];
    const mapZoom = 11;

    // --- 2. 逻辑增强 ---

    // 创建一个查找表，方便快速知道每个地点属于哪一天
    const dailyLocationsMap = new Map<string, string>();
    trip.days.forEach(day => {
        day.locations.forEach(loc => dailyLocationsMap.set(loc.id, day.id));
    });

    const allLocations = [
        ...trip.savedLocations,
        ...trip.days.flatMap(day => day.locations)
    ];

    return (
        <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} className="w-full h-full rounded-lg z-0">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {allLocations.map(location => {
                const position = locationCoordinates[location.id];
                if (!position) return null;

                // 判断这个地点是否已规划，并选择对应的图标
                const isPlanned = dailyLocationsMap.has(location.id);
                const icon = isPlanned ? blueIcon : greyIcon;

                return (
                    <Marker key={location.id} position={position} icon={icon}>
                        <Popup>
                            <b>{location.name}</b> <br />
                            来自视频: {location.videoSource}
                        </Popup>
                    </Marker>
                );
            })}

            {/* --- 3. 绘制每日路线 --- */}
            {trip.days.map(day => {
                const positions = day.locations
                    .map(loc => locationCoordinates[loc.id])
                    .filter(pos => pos) as [number, number][]; // 过滤掉没有坐标的地点

                if (positions.length < 2) return null; // 至少需要两个点才能连线

                return <Polyline key={day.id} pathOptions={{ color: '#3b82f6', weight: 4 }} positions={positions} />;
            })}
        </MapContainer>
    );
};