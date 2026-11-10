import React, {useState, useMemo} from "react";
import {Edit, Trash2, Search, CheckCircle2} from "lucide-react";

const CATEGORIES_TASK = [
    "Tất cả",
    "PHÒNG VĂN HÓA",
    "PHÒNG KINH TẾ",
    "PHÒNG CUNG ỨNG",
    "VĂN PHÒNG UBND",
    "MẶT TRẬN TỔ QUỐC VIỆT NAM",
    "CÔNG AN",
    "QUÂN SỰ",
];
const STATUSES_TASK = ["Chờ xử lý", "Đang làm", "Hoàn thành"];

export default function TaskManager({tasks, members, onEdit, onDelete}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("Tất cả");
    const [assigneeFilter, setAssigneeFilter] = useState("Tất cả");
    const [statusFilter, setStatusFilter] = useState("Tất cả");

    const filteredTasks = useMemo(() => {
        return tasks.filter((t) => {
            const matchSearch =
                t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchCat = categoryFilter === "Tất cả" || t.category === categoryFilter;
            const matchAssignee = assigneeFilter === "Tất cả" || t.assigneeId === assigneeFilter;
            const matchStatus = statusFilter === "Tất cả" || t.status === statusFilter;
            return matchSearch && matchCat && matchAssignee && matchStatus;
        });
    }, [tasks, searchTerm, categoryFilter, assigneeFilter, statusFilter]);

    return (
        <div className="space-y-4">
            {/* Bộ lọc tìm kiếm */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-300 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
                <div className="relative w-full md:w-72">
                    <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm công việc..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-red-700"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="text-xs p-2 border border-slate-300 rounded bg-white"
                    >
                        {CATEGORIES_TASK.map((cat) => (
                            <option key={cat} value={cat}>
                                Mảng: {cat}
                            </option>
                        ))}
                    </select>

                    <select
                        value={assigneeFilter}
                        onChange={(e) => setAssigneeFilter(e.target.value)}
                        className="text-xs p-2 border border-slate-300 rounded bg-white"
                    >
                        <option value="Tất cả">Tất cả cán bộ</option>
                        {members.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="text-xs p-2 border border-slate-300 rounded bg-white"
                    >
                        <option value="Tất cả">Mọi trạng thái</option>
                        {STATUSES_TASK.map((st) => (
                            <option key={st} value={st}>
                                {st}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Danh sách task */}
            <div className="space-y-3">
                {filteredTasks.length === 0 ? (
                    <div className="bg-white p-8 text-center text-slate-500 rounded-lg border border-slate-300">
                        Không tìm thấy công việc phù hợp.
                    </div>
                ) : (
                    filteredTasks.map((task) => {
                        const assignee = members.find((m) => m.id === task.assigneeId);

                        // CHỈ XEM LÀ "HOÀN THÀNH" KHI TRẠNG THÁI LÀ "Hoàn thành" HOẶC TIẾN ĐỘ ĐẠT 100%
                        const isCompleted = task.status === "Hoàn thành" || task.progress === 100;

                        return (
                            <div
                                key={task.id}
                                className={`rounded-lg border p-4 shadow-sm transition ${
                                    isCompleted
                                        ? "bg-emerald-50/40 border-emerald-300"
                                        : "bg-white border-slate-300 hover:border-slate-400"
                                }`}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                    <div className="space-y-1 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span
                                                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                                    task.priority === "Khẩn cấp"
                                                        ? "bg-red-100 text-red-800 border border-red-300"
                                                        : "bg-amber-100 text-amber-800 border border-amber-300"
                                                }`}
                                            >
                                                {task.priority}
                                            </span>
                                            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                                                {task.category}
                                            </span>
                                            <span
                                                className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                                                    isCompleted
                                                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                                        : "bg-blue-100 text-blue-800"
                                                }`}
                                            >
                                                {isCompleted && <CheckCircle2 size={11} />}
                                                {task.status}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-base">{task.title}</h3>
                                        <p className="text-xs text-slate-600">{task.description}</p>

                                        {task.targetCount !== undefined && (
                                            <div className="text-[11px] font-mono text-slate-600 pt-0.5">
                                                Đã làm: <b className="text-red-700">{task.currentCount || 0}</b> / Tổng
                                                chỉ tiêu: <b>{task.targetCount}</b>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                                            <span>
                                                👤 Phụ trách: <b>{assignee ? assignee.name : "Chưa rõ"}</b>
                                            </span>
                                            <span>
                                                📅 Hạn chót: <b>{task.deadline}</b>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                                        <div className="flex items-center gap-2 w-full md:w-36">
                                            <div className="flex-1 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${
                                                        isCompleted ? "bg-emerald-600" : "bg-red-700"
                                                    }`}
                                                    style={{width: `${task.progress}%`}}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-mono font-bold">{task.progress}%</span>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            {/* NẾU CHƯA HOÀN THÀNH HOẶC CHƯA ĐẠT 100%, VẪN CHO PHÉP BẤM SỬA BÌNH THƯỜNG */}
                                            {!isCompleted ? (
                                                <button
                                                    onClick={() => onEdit(task)}
                                                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-300 transition"
                                                    title="Sửa công việc"
                                                >
                                                    <Edit size={14} />
                                                </button>
                                            ) : (
                                                <span className="text-[10px] text-emerald-700 font-bold px-2 py-1 bg-emerald-100/60 rounded border border-emerald-200">
                                                    Đã hoàn tất
                                                </span>
                                            )}

                                            <button
                                                onClick={() => onDelete(task.id)}
                                                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded border border-red-300 transition"
                                                title="Xóa công việc"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
