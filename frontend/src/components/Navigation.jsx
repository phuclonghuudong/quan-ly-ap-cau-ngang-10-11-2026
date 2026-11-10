import React from "react";

export default function Navigation({activeTab, setActiveTab, tasksCount, staffCount, logsCount}) {
    const navItems = [
        {id: "dashboard", label: "📊 Tổng quan", count: null},
        {id: "tasks", label: "📋 Tiến độ", count: tasksCount},
        {id: "staff", label: "👥 Ban ấp", count: staffCount},
        {id: "journal", label: "📓 Nhật ký", count: logsCount},
    ];

    return (
        <>
            {/* 1. SIDEBAR CHO MÀN HÌNH LỚN (NẰM BÊN TRÁI) */}
            <nav className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-200 border-r border-slate-800 p-3 space-y-1.5 shrink-0 min-h-[calc(100vh-77px)]">
                <div className="text-[11px] font-bold text-slate-500 uppercase px-3 py-2 tracking-wider">
                    Danh mục quản lý
                </div>
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full px-3.5 py-3 text-sm font-semibold rounded-lg transition flex items-center justify-between text-left ${
                                isActive
                                    ? "bg-red-900/90 text-yellow-300 font-bold border-l-4 border-yellow-500 shadow-sm"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                            }`}
                        >
                            <span className="flex items-center gap-2.5">{item.label}</span>
                            {item.count !== null && (
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                                        isActive
                                            ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40"
                                            : "bg-slate-800 text-slate-400"
                                    }`}
                                >
                                    {item.count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* 2. BOTTOM NAVIGATION CHO MÀN HÌNH NHỎ / THU PHÓNG (NẰM Ở ĐÁY MÀN HÌNH) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 text-slate-200 border-t border-slate-800 z-40 shadow-lg print:hidden">
                <div className="grid grid-cols-4 gap-1 p-1">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex flex-col items-center justify-center py-2 px-1 text-[11px] font-semibold transition relative ${
                                    isActive
                                        ? "text-yellow-400 bg-slate-800 rounded"
                                        : "text-slate-400 hover:text-slate-200"
                                }`}
                            >
                                <span className="text-base mb-0.5">{item.label.split(" ")[0]}</span>
                                <span className="truncate max-w-full">{item.label.split(" ").slice(1).join(" ")}</span>
                                {item.count !== null && item.count > 0 && (
                                    <span className="absolute top-1 right-2 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] flex items-center justify-center font-mono">
                                        {item.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
