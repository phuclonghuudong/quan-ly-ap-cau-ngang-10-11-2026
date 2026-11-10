import React from "react";
import {Edit, Trash2, Phone, MessageSquare, MapPin, Building2} from "lucide-react";

export default function MemberManager({members, onEdit, onDelete}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
                <div
                    key={member.id}
                    className="bg-white rounded-lg border border-slate-300 p-4 shadow-sm flex flex-col justify-between"
                >
                    <div>
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-[10px] font-bold uppercase bg-red-100 text-red-800 px-2 py-0.5 rounded border border-red-300">
                                    {member.role}
                                </span>
                                <h3 className="font-extrabold text-slate-900 text-base mt-1.5">{member.name}</h3>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => onEdit(member)}
                                    className="p-1.5 text-slate-600 hover:bg-slate-100 rounded border border-slate-300"
                                >
                                    <Edit size={14} />
                                </button>
                                <button
                                    onClick={() => onDelete(member.id)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded border border-red-300"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                            <div className="flex items-center gap-2">
                                <MapPin size={14} className="text-slate-400 shrink-0" />
                                <span>
                                    Địa bàn: <b>{member.area}</b>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Building2 size={14} className="text-slate-400 shrink-0" />
                                <span>
                                    Số hộ quản lý: <b>{member.households} hộ</b>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="text-slate-400 shrink-0" />
                                <span>
                                    Điện thoại: <b className="font-mono">{member.phone}</b>
                                </span>
                            </div>
                            {member.note && (
                                <p className="italic text-slate-500 bg-slate-50 p-2 rounded border border-slate-200 mt-2">
                                    "{member.note}"
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 flex gap-2">
                        <a
                            href={`tel:${member.phone}`}
                            className="flex-1 flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded shadow-sm"
                        >
                            <Phone size={14} /> Gọi Thoại
                        </a>
                        <a
                            href={`https://zalo.me/${member.phone}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded shadow-sm"
                        >
                            <MessageSquare size={14} /> Nhắn Zalo
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
