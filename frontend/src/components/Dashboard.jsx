import React from "react";
import {CheckSquare, AlertTriangle, TrendingUp, Users, ChevronRight, Phone} from "lucide-react";

export default function Dashboard({tasks, members, targets, setActiveTab}) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "Hoàn thành").length;
    const pendingTasks = tasks.filter((t) => t.status === "Chờ xử lý").length;
    const urgentTasks = tasks.filter((t) => t.priority === "Khẩn cấp" && t.status !== "Hoàn thành").length;

    const bhytTarget = targets.find((t) => t.id === "tg1");
    const bhytPercent = bhytTarget ? Math.round((bhytTarget.current / bhytTarget.target) * 100) : 0;

    return (
        <div className="space-y-4">
            {/* 4 Thẻ KPI */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-3.5 rounded-lg border-l-4 border-l-red-700 border-y border-r border-slate-300 shadow-sm">
                    <div className="flex items-center justify-between text-slate-600 text-xs font-bold uppercase">
                        <span>Tổng Công Việc</span>
                        <CheckSquare size={16} className="text-red-700" />
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-2xl font-black text-slate-900">{totalTasks}</span>
                        <span className="text-xs text-slate-500">{completedTasks} hoàn thành</span>
                    </div>
                </div>

                <div className="bg-white p-3.5 rounded-lg border-l-4 border-l-amber-500 border-y border-r border-slate-300 shadow-sm">
                    <div className="flex items-center justify-between text-slate-600 text-xs font-bold uppercase">
                        <span>Khẩn Cấp / Tồn Đọng</span>
                        <AlertTriangle size={16} className="text-amber-600" />
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-2xl font-black text-amber-600">{urgentTasks}</span>
                        <span className="text-xs text-slate-500">{pendingTasks} việc chờ xử lý</span>
                    </div>
                </div>

                <div className="bg-white p-3.5 rounded-lg border-l-4 border-l-emerald-600 border-y border-r border-slate-300 shadow-sm">
                    <div className="flex items-center justify-between text-slate-600 text-xs font-bold uppercase">
                        <span>Tỷ Lệ BHYT Ấp</span>
                        <TrendingUp size={16} className="text-emerald-600" />
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-2xl font-black text-emerald-600">{bhytPercent}%</span>
                        <span className="text-xs text-slate-500">Chỉ tiêu xã giao 95%</span>
                    </div>
                </div>

                <div className="bg-white p-3.5 rounded-lg border-l-4 border-l-blue-600 border-y border-r border-slate-300 shadow-sm">
                    <div className="flex items-center justify-between text-slate-600 text-xs font-bold uppercase">
                        <span>Nhân Sự Ban Ấp</span>
                        <Users size={16} className="text-blue-600" />
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-2xl font-black text-blue-600">{members.length}</span>
                        <span className="text-xs text-slate-500">Trực tiếp 4 tổ liên gia</span>
                    </div>
                </div>
            </div>

            {/* Bố cục 2 cột: Công việc ưu tiên & Chỉ tiêu / Liên lạc nhanh */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Cột trái: Công việc ưu tiên */}
                <div className="lg:col-span-2 bg-white rounded-lg border border-slate-300 shadow-sm p-4 flex flex-col">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <h3 className="font-extrabold text-sm uppercase text-slate-800 flex items-center gap-2">
                            <AlertTriangle size={16} className="text-red-700" /> Công Việc Ưu Tiên Và Đang Thực Hiện
                        </h3>
                        <button
                            onClick={() => setActiveTab("tasks")}
                            className="text-xs font-bold text-red-700 hover:underline flex items-center gap-0.5"
                        >
                            Xem tất cả <ChevronRight size={14} />
                        </button>
                    </div>

                    <div className="divide-y divide-slate-100 flex-1 space-y-3 mt-2">
                        {tasks
                        .filter((t) => t.status !== "Hoàn thành")
                        .slice(0, 3)
                        .map((task) => {
                            const assignee = members.find((m) => m.id === task.assigneeId);
                            return (
                                <div
                                    key={task.id}
                                    className="pt-3 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                                    task.priority === "Khẩn cấp"
                                                        ? "bg-red-100 text-red-800 border border-red-300"
                                                        : "bg-slate-100 text-slate-700"
                                                }`}
                                            >
                                                {task.priority.toUpperCase()}
                                            </span>
                                            <span className="text-xs text-slate-500 font-medium">{task.category}</span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 text-sm">{task.title}</h4>
                                        <div className="text-[11px] text-slate-500 flex items-center gap-3">
                                            <span>
                                                Phụ trách: <b>{assignee ? assignee.name : "Chưa rõ"}</b>
                                            </span>
                                            <span>
                                                Hạn: <span className="text-red-700 font-semibold">{task.deadline}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 self-end sm:self-center">
                                        <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                                            <div
                                                className="bg-red-700 h-full"
                                                style={{width: `${task.progress}%`}}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-mono font-bold text-slate-700">
                                            {task.progress}%
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Cột phải: Chỉ tiêu quỹ & Liên lạc nhanh */}
                <div className="space-y-4">
                    <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                            <h3 className="font-extrabold text-sm uppercase text-slate-800">Chỉ Tiêu & Quỹ Địa Bàn</h3>
                            <button
                                onClick={() => setActiveTab("targets")}
                                className="text-xs font-bold text-red-700 hover:underline"
                            >
                                Chi tiết
                            </button>
                        </div>
                        <div className="space-y-3 mt-3">
                            {targets.map((tg) => {
                                const percent = Math.min(Math.round((tg.current / tg.target) * 100), 100);
                                return (
                                    <div key={tg.id} className="space-y-1">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-slate-800">{tg.name}</span>
                                            <span className="text-emerald-700">{percent}%</span>
                                        </div>
                                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                            <div className="bg-emerald-600 h-full" style={{width: `${percent}%`}}></div>
                                        </div>
                                        <div className="text-[10px] text-slate-500 text-right font-mono">
                                            {tg.type === "money"
                                                ? `${tg.current.toLocaleString()} đ / ${tg.target.toLocaleString()} đ`
                                                : `${tg.current} / ${tg.target} ${tg.unit}`}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Khung Liên lạc nhanh */}
                    <div className="bg-red-50/60 rounded-lg border border-red-200 p-3.5 space-y-2">
                        <h4 className="font-bold text-xs uppercase text-red-900 flex items-center gap-1.5">
                            <Phone size={14} /> Liên Lạc Nhanh Trưởng Ban Ấp
                        </h4>
                        <div className="divide-y divide-red-100 text-xs">
                            {members.slice(0, 2).map((m) => (
                                <div key={m.id} className="py-1.5 flex justify-between items-center">
                                    <span className="text-slate-700 truncate max-w-[150px]">
                                        {m.role}: <b>{m.name}</b>
                                    </span>
                                    <a
                                        href={`tel:${m.phone}`}
                                        className="font-mono text-red-700 font-bold hover:underline"
                                    >
                                        {m.phone}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
