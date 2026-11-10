import React, {useState} from "react";
import {X} from "lucide-react";

export default function MemberModal({initialData, onClose, onSave}) {
    const [form, setForm] = useState(
        initialData || {name: "", role: "Tổ trưởng", phone: "", area: "Tổ liên gia", households: 50, note: ""}
    );

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-3 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-5 space-y-4 shadow-xl border border-slate-300">
                <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="font-extrabold text-base uppercase">{initialData ? "Sửa Cán Bộ" : "Thêm Cán Bộ"}</h3>
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
                        <label className="block text-xs font-bold mb-1">Họ tên:</label>
                        <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({...form, name: e.target.value})}
                            className="w-full p-2 text-xs border rounded"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold mb-1">Chức vụ:</label>
                            <input
                                type="text"
                                required
                                value={form.role}
                                onChange={(e) => setForm({...form, role: e.target.value})}
                                className="w-full p-2 text-xs border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1">Điện thoại:</label>
                            <input
                                type="text"
                                required
                                value={form.phone}
                                onChange={(e) => setForm({...form, phone: e.target.value})}
                                className="w-full p-2 text-xs border rounded"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold mb-1">Địa bàn:</label>
                            <input
                                type="text"
                                value={form.area}
                                onChange={(e) => setForm({...form, area: e.target.value})}
                                className="w-full p-2 text-xs border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1">Số hộ quản lý:</label>
                            <input
                                type="number"
                                value={form.households}
                                onChange={(e) => setForm({...form, households: Number(e.target.value)})}
                                className="w-full p-2 text-xs border rounded"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-1">Ghi chú:</label>
                        <input
                            type="text"
                            value={form.note}
                            onChange={(e) => setForm({...form, note: e.target.value})}
                            className="w-full p-2 text-xs border rounded"
                        />
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
