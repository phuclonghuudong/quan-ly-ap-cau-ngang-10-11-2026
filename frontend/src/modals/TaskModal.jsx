import React, {useState} from "react";
import {X} from "lucide-react";

const CATEGORIES = [
    "PHÒNG VĂN HÓA",
    "PHÒNG KINH TẾ",
    "PHÒNG CUNG ỨNG",
    "VĂN PHÒNG UBND",
    "MẶT TRẬN TỔ QUỐC VIỆT NAM",
    "CÔNG AN",
    "QUÂN SỰ",
];
const PRIORITIES = ["Khẩn cấp", "Cao", "Bình thường"];
const STATUSES = ["Chờ xử lý", "Đang làm", "Hoàn thành"];

export default function TaskModal({initialData, members, onClose, onSave}) {
    const [form, setForm] = useState(
        initialData || {
            title: "",
            category: CATEGORIES[0],
            priority: PRIORITIES[1],
            deadline: new Date().toISOString().slice(0, 10),
            status: STATUSES[0],
            assigneeId: members[0]?.id || "",
            currentCount: 0, // Số lượng đã đạt / thực hiện được
            targetCount: 100, // Tổng số lượng / chỉ tiêu cần đạt
            progress: 0,
            description: "",
        }
    );

    // Hàm tự động tính toán tiến độ % khi người dùng thay đổi số lượng thực tế hoặc tổng chỉ tiêu
    const handleCountChange = (field, value) => {
        const numValue = Math.max(0, Number(value));
        const updatedForm = {...form, [field]: numValue};

        const current = field === "currentCount" ? numValue : form.currentCount;
        const target = field === "targetCount" ? numValue : form.targetCount;

        if (target > 0) {
            const calculatedProgress = Math.min(100, Math.round((current / target) * 100));
            updatedForm.progress = calculatedProgress;

            // Tự động chuyển trạng thái nếu đạt 100%
            if (calculatedProgress === 100) {
                updatedForm.status = "Hoàn thành";
            } else if (calculatedProgress > 0 && updatedForm.status === "Chờ xử lý") {
                updatedForm.status = "Đang làm";
            }
        }

        setForm(updatedForm);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-3 z-50">
            <div className="bg-white rounded-lg max-w-lg w-full p-5 space-y-4 shadow-xl border border-slate-300">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <h3 className="font-extrabold text-base uppercase text-slate-900">
                        {initialData ? "Sửa Công Việc" : "Giao Việc Mới"}
                    </h3>
                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSave(form);
                    }}
                    className="space-y-3"
                >
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Tên công việc:</label>
                        <input
                            type="text"
                            required
                            value={form.title}
                            onChange={(e) => setForm({...form, title: e.target.value})}
                            className="w-full p-2 text-xs border rounded"
                            placeholder="VD: Vận động BHYT hộ gia đình..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Mảng:</label>
                            <select
                                value={form.category}
                                onChange={(e) => setForm({...form, category: e.target.value})}
                                className="w-full p-2 text-xs border rounded bg-white"
                            >
                                {CATEGORIES.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Độ ưu tiên:</label>
                            <select
                                value={form.priority}
                                onChange={(e) => setForm({...form, priority: e.target.value})}
                                className="w-full p-2 text-xs border rounded bg-white"
                            >
                                {PRIORITIES.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Phần nhập số lượng thực tế và tổng chỉ tiêu */}
                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                                Đã thực hiện (Số lượng):
                            </label>
                            <input
                                type="number"
                                min="0"
                                required
                                value={form.currentCount ?? 0}
                                onChange={(e) => handleCountChange("currentCount", e.target.value)}
                                className="w-full p-2 text-xs border rounded bg-white font-mono font-bold text-red-700"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                                Tổng chỉ tiêu cần đạt:
                            </label>
                            <input
                                type="number"
                                min="1"
                                required
                                value={form.targetCount ?? 100}
                                onChange={(e) => handleCountChange("targetCount", e.target.value)}
                                className="w-full p-2 text-xs border rounded bg-white font-mono font-bold text-slate-800"
                            />
                        </div>
                        <div className="col-span-2 flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                            <span className="text-slate-600 font-medium">Tiến độ tự động tính:</span>
                            <span className="font-bold font-mono text-emerald-700 text-sm">
                                {form.progress}% ({form.currentCount || 0} / {form.targetCount || 0})
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Cán bộ phụ trách:</label>
                            <select
                                value={form.assigneeId}
                                onChange={(e) => setForm({...form, assigneeId: e.target.value})}
                                className="w-full p-2 text-xs border rounded bg-white"
                            >
                                {members.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Hạn hoàn thành:</label>
                            <input
                                type="date"
                                required
                                value={form.deadline}
                                onChange={(e) => setForm({...form, deadline: e.target.value})}
                                className="w-full p-2 text-xs border rounded"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả / Ghi chú:</label>
                        <textarea
                            rows="2"
                            value={form.description}
                            onChange={(e) => setForm({...form, description: e.target.value})}
                            className="w-full p-2 text-xs border rounded"
                            placeholder="Ghi chú chi tiết về tình hình thực hiện..."
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-slate-100 text-xs font-bold rounded"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-700 text-white text-xs font-bold rounded shadow"
                        >
                            Lưu Lại
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
