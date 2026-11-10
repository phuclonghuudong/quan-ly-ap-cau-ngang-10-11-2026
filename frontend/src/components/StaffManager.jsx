import React from "react";

export default function StaffManager({staff, tasks, onAddStaff, onDeleteStaff}) {
    return (
        <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex justify-between items-center">
                <div>
                    <h2 className="font-bold text-slate-800 text-base">Danh Sách Cán Bộ & Tổ Trưởng Ấp</h2>
                    <p className="text-xs text-slate-500">Phân công nhiệm vụ và liên lạc trực tiếp</p>
                </div>
                <button
                    onClick={onAddStaff}
                    className="bg-red-800 hover:bg-red-900 text-white text-xs font-bold px-3 py-2 rounded shadow"
                >
                    + Thêm nhân sự
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staff.map((person) => {
                    const assignedTasks = tasks.filter((t) => t.assignedTo === person.name);
                    const cleanPhone = person.phone ? person.phone.replace(/\D/g, "") : "";

                    return (
                        <div
                            key={person.id}
                            className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col justify-between gap-3"
                        >
                            <div>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
                                            {person.role}
                                        </span>
                                        <h3 className="font-extrabold text-slate-800 text-lg mt-1">{person.name}</h3>
                                    </div>
                                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                                        {person.status}
                                    </span>
                                </div>

                                <div className="text-xs text-slate-600 space-y-1 mt-3">
                                    <div>
                                        <b>Địa bàn phụ trách:</b> {person.area}
                                    </div>
                                    <div>
                                        <b>Số điện thoại:</b>{" "}
                                        <span className="font-mono font-bold text-slate-800">{person.phone}</span>
                                    </div>
                                    <div>
                                        <b>Việc đang phụ trách:</b> {assignedTasks.length} nhiệm vụ
                                    </div>
                                </div>
                            </div>

                            {/* Nút thao tác liên lạc nhanh 1-chạm */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <a
                                        href={`tel:${cleanPhone}`}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 shadow-sm"
                                    >
                                        📞 Gọi thoại
                                    </a>
                                    <a
                                        href={`https://zalo.me/${cleanPhone}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 shadow-sm"
                                    >
                                        💬 Zalo
                                    </a>
                                </div>

                                <button
                                    onClick={() => onDeleteStaff(person.id)}
                                    className="text-xs text-red-600 hover:underline"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
