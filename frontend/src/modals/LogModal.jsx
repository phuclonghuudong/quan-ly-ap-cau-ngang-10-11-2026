import React, {useState} from "react";
import {X} from "lucide-react";

export default function LogModal({initialData, onClose, onSave}) {
    const [form, setForm] = useState(
        initialData || {
            date: new Date().toISOString().slice(0, 10),
            title: "",
            category: "Biên bản họp",
            status: "Đang theo dõi",
            content: "",
        }
    );

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-3 z-50">
            <div className="bg-white rounded-lg max-w-lg w-full p-5 space-y-4 shadow-xl border">
                <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="font-extrabold text-base uppercase">
                        {initialData ? "Sửa Nhật Ký" : "Ghi Nhật Ký Mới"}
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
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold mb-1">Ngày:</label>
                            <input
                                type="date"
                                required
                                value={form.date}
                                onChange={(e) => setForm({...form, date: e.target.value})}
                                className="w-full p-2 text-xs border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1">Loại:</label>
                            <select
                                value={form.category}
                                onChange={(e) => setForm({...form, category: e.target.value})}
                                className="w-full p-2 text-xs border rounded bg-white"
                            >
                                <option value="Biên bản họp">Biên bản họp</option>
                                <option value="Hòa giải & Ranh giới">Hòa giải & Ranh giới</option>
                                <option value="Khảo sát thực địa">Khảo sát thực địa</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-1">Tiêu đề:</label>
                        <input
                            type="text"
                            required
                            value={form.title}
                            onChange={(e) => setForm({...form, title: e.target.value})}
                            className="w-full p-2 text-xs border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-1">Nội dung chi tiết:</label>
                        <textarea
                            rows="4"
                            required
                            value={form.content}
                            onChange={(e) => setForm({...form, content: e.target.value})}
                            className="w-full p-2 text-xs border rounded"
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
