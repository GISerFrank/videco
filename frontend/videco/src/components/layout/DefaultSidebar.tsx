// src/components/layout/DefaultSidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, BookUser, Clapperboard } from 'lucide-react'; // 移除了 Briefcase

// ... NavItem 组件无变化 ...
const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string; isActive: boolean; }> = ({ to, icon, label, isActive }) => {
    return (
        <Link
            to={to}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm ${
                isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
        >
            {icon}
            <span className="font-semibold">{label}</span>
        </Link>
    );
};

export const DefaultSidebar: React.FC = () => {
    const location = useLocation();
    const pathname = location.pathname;

    // 移除了独立的 "Projects" 入口
    const navItems = [
        { to: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
        { to: '/trip-planner', label: 'Trip Planner', icon: <Map className="h-5 w-5" /> },
        { to: '/me/knowledge-base', label: 'Knowledge Base', icon: <BookUser className="h-5 w-5" /> },
        { to: '/watch/example', label: 'Watch', icon: <Clapperboard className="h-5 w-5" /> },
    ];

    return (
        <div className="p-4 h-full bg-white dark:bg-gray-900 flex flex-col">
            <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                    <NavItem
                        key={item.to}
                        to={item.to}
                        icon={item.icon}
                        label={item.label}
                        isActive={pathname.startsWith(item.to) && item.to !== '/' || pathname === '/'}
                    />
                ))}
            </nav>
        </div>
    );
};