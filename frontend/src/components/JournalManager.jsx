import React from "react";
import {Edit, Trash2} from "lucide-react";

export default function JournalManager({logs, onEdit, onDelete}) {
    return (
        <div className="space-y-3">
            {logs.map((log) => (
                <div key={log.id} className="bg-white rounded-lg border border-slate-300 p-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                        <div className="flex items-center gap-2">
                            <span className="bg-slate-100 text-slate-800 text-xs px-2 py-0.5 rounded font-bold border border-slate-300">
                                {log.category}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">📅 {log.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                                {log.status}
                            </span>
                            <button
                                onClick={() => onEdit(log)}
                                className="p-1 text-slate-600 hover:bg-slate-100 rounded border border-slate-300"
                            >
                                <Edit size={14} />
                            </button>
                            <button
                                onClick={() => onDelete(log.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded border border-red-300"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mt-2">{log.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 whitespace-pre-line leading-relaxed">
                        {log.content}
                    </p>
                </div>
            ))}
        </div>
    );
}
