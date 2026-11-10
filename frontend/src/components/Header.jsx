import React from "react";

export default function Header({tasksCount, onOpenTaskModal, onExport, onImportClick, fileInputRef, onImportFile}) {
    return (
        <header className="bg-gradient-to-r from-red-900 via-red-800 to-amber-900 text-white shadow-md border-b-4 border-yellow-500">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-500 text-red-950 rounded-full flex items-center justify-center font-black text-2xl border-2 border-white shadow">
                        ★
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold tracking-tight uppercase">Sổ Tay Quản Lý Ấp Số</h1>
                            <span className="bg-red-950 text-yellow-400 text-xs px-2 py-0.5 rounded font-mono border border-yellow-600/40">
                                V2.4
                            </span>
                        </div>
                        <p className="text-xs text-red-100/90 font-medium">
                            Hệ thống theo dõi công tác cơ sở & Ban nhân dân ấp
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 print:hidden">
                    <button
                        onClick={onOpenTaskModal}
                        className="bg-yellow-500 hover:bg-yellow-400 text-red-950 font-bold px-3 py-2 rounded text-sm flex items-center gap-1.5 shadow transition"
                    >
                        <span>+</span> Thêm việc mới
                    </button>

                    <button
                        onClick={() => window.print()}
                        className="bg-red-950 hover:bg-red-900 text-white font-medium px-3 py-2 rounded text-sm border border-red-700/60 shadow flex items-center gap-1"
                    >
                        🖨️ In Báo Cáo
                    </button>

                    <div className="h-6 w-px bg-red-700/50 hidden sm:block"></div>

                    <button
                        onClick={onExport}
                        className="bg-red-900/60 hover:bg-red-900 text-red-100 px-2.5 py-2 rounded text-xs border border-red-700/50"
                        title="Tải file dự phòng .JSON"
                    >
                        📥 Xuất File
                    </button>

                    <button
                        onClick={onImportClick}
                        className="bg-red-900/60 hover:bg-red-900 text-red-100 px-2.5 py-2 rounded text-xs border border-red-700/50"
                        title="Nạp dữ liệu từ file .JSON"
                    >
                        📤 Nhập File
                    </button>

                    <input type="file" ref={fileInputRef} onChange={onImportFile} accept=".json" className="hidden" />
                </div>
            </div>
        </header>
    );
}
