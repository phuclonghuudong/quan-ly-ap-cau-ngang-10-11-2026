import React from "react";
import {Edit, CheckCircle2} from "lucide-react";

const formatVND = (amount) => new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(amount);

export default function TargetManager({targets, onEdit}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {targets.map((target) => {
                const percent = Math.min(Math.round((target.current / target.target) * 100), 100);

                // CHỈ KHÓA KHI ĐẠT ĐÚNG HOẶC VƯỢT 100%
                const isCompleted = percent >= 100;

                return (
                    <div
                        key={target.id}
                        className={`rounded-lg border p-4 shadow-sm space-y-3 transition ${
                            isCompleted ? "bg-emerald-50/40 border-emerald-300" : "bg-white border-slate-300"
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-300">
                                        {target.category}
                                    </span>
                                    {isCompleted && (
                                        <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                                            <CheckCircle2 size={12} /> Đã đạt chỉ tiêu
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-extrabold text-slate-900 text-base mt-1">{target.name}</h3>
                            </div>

                            {/* Vẫn cho phép sửa nếu chưa đạt 100%, trừ khi đạt rồi mới khóa */}
                            {!isCompleted ? (
                                <button
                                    onClick={() => onEdit(target)}
                                    className="p-1 text-slate-600 hover:bg-slate-100 rounded border border-slate-300 transition"
                                    title="Cập nhật chỉ tiêu"
                                >
                                    <Edit size={14} />
                                </button>
                            ) : (
                                <span className="text-[10px] text-emerald-700 font-bold px-2 py-1 bg-emerald-100/60 rounded border border-emerald-200">
                                    Đã hoàn tất
                                </span>
                            )}
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-xs font-bold text-slate-700">
                                <span>
                                    Đã đạt:{" "}
                                    {target.type === "money"
                                        ? formatVND(target.current)
                                        : `${target.current} ${target.unit}`}
                                </span>
                                <span>
                                    Mục tiêu:{" "}
                                    {target.type === "money"
                                        ? formatVND(target.target)
                                        : `${target.target} ${target.unit}`}
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-500 ${
                                        isCompleted ? "bg-emerald-600" : "bg-red-700"
                                    }`}
                                    style={{width: `${percent}%`}}
                                ></div>
                            </div>
                            <div className="text-right text-xs font-mono font-bold text-slate-500">
                                {percent}% hoàn thành
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
