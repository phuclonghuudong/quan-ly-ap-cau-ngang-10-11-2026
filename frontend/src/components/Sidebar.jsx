import React, {useState} from "react";
import {
    LayoutDashboard,
    CheckSquare,
    Users,
    BookOpen,
    PieChart,
    Building2,
    Printer,
    Download,
    Upload,
    Menu,
    X,
} from "lucide-react";

export default function Sidebar({activeTab, setActiveTab, counts, onExport, onImport, onPrint}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        {id: "dashboard", label: "Tổng quan", fullLabel: "Tổng Quan Địa Bàn", icon: LayoutDashboard, count: null},
        {id: "tasks", label: "Công việc", fullLabel: "Công Việc & Tiến Độ", icon: CheckSquare, count: counts.tasks},
        {id: "members", label: "Cán bộ", fullLabel: "Cán Bộ & Ban Ấp", icon: Users, count: counts.members},
        {id: "logs", label: "Nhật ký", fullLabel: "Nhật Ký & Xác Minh", icon: BookOpen, count: counts.logs},
        {id: "targets", label: "Chỉ tiêu", fullLabel: "Chỉ Tiêu & Thu Quỹ", icon: PieChart, count: null},
    ];

    const handleSelectTab = (id) => {
        setActiveTab(id);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* ------------------------------------------------------------- */}
            {/* 1. HEADER DI ĐỘNG (CÓ NÚT MENU NĂM GÓC PHẢI)                 */}
            {/* ------------------------------------------------------------- */}
            <header className="md:hidden bg-red-950 text-white p-3 flex items-center justify-between border-b-2 border-red-700 sticky top-0 z-40 shadow-md print:hidden">
                <div className="flex items-center gap-2.5">
                    <div className="bg-red-700 p-1.5 rounded text-yellow-300 font-bold border border-yellow-400">
                        <Building2 size={20} />
                    </div>
                    <div>
                        <h1 className="font-bold text-sm tracking-wide uppercase text-yellow-300">SỔ TAY TRƯỞNG ẤP</h1>
                        <p className="text-[10px] text-slate-300">Ban Nhân Dân Ấp Số</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={onPrint}
                        className="p-2 bg-red-900 text-white rounded hover:bg-red-800 border border-red-700"
                        title="In báo cáo"
                    >
                        <Printer size={16} />
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 bg-yellow-500 text-red-950 rounded font-bold shadow hover:bg-yellow-400"
                        title="Mở tiện ích"
                    >
                        <Menu size={18} />
                    </button>
                </div>
            </header>

            {/* ------------------------------------------------------------- */}
            {/* 2. SIDEBAR CỐ ĐỊNH CHO MÁY TÍNH (DESKTOP SIDEBAR)            */}
            {/* ------------------------------------------------------------- */}
            <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-100 border-r border-slate-800 shrink-0 print:hidden">
                <div className="bg-gradient-to-r from-red-900 to-red-950 p-4 border-b-2 border-yellow-500">
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-500 text-red-950 p-2 rounded font-black shadow">
                            <Building2 size={24} />
                        </div>
                        <div>
                            <h1 className="font-extrabold text-sm text-yellow-300 tracking-wider uppercase">
                                SỔ TAY TRƯỞNG ẤP
                            </h1>
                            <p className="text-[11px] text-slate-200 font-medium">Ban Nhân Dân Ấp Số</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-3 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded font-medium text-sm transition ${
                                    isActive
                                        ? "bg-red-800 text-yellow-300 border-l-4 border-yellow-400 shadow-sm font-bold"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} />
                                    {item.fullLabel}
                                </div>
                                {item.count !== null && (
                                    <span className="bg-slate-800 text-yellow-400 text-xs px-2 py-0.5 rounded font-bold border border-slate-700">
                                        {item.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-slate-800 bg-slate-950 space-y-2">
                    <div className="flex gap-2">
                        <button
                            onClick={onExport}
                            className="flex-1 flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 py-2 rounded border border-slate-700 font-medium"
                        >
                            <Download size={14} /> Sao lưu
                        </button>
                        <label className="flex-1 flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 py-2 rounded border border-slate-700 font-medium cursor-pointer">
                            <Upload size={14} /> Nạp dữ liệu
                            <input type="file" accept=".json" onChange={onImport} className="hidden" />
                        </label>
                    </div>
                    <button
                        onClick={onPrint}
                        className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-slate-950 font-bold text-xs py-2 rounded transition shadow"
                    >
                        <Printer size={14} /> In Báo Cáo UBND Xã
                    </button>
                </div>
            </aside>

            {/* ------------------------------------------------------------- */}
            {/* 3. BOTTOM NAVIGATION CỐ ĐỊNH Ở ĐÁY MÀN HÌNH ĐIỆN THOẠI         */}
            {/* ------------------------------------------------------------- */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t-2 border-red-700 flex justify-around items-center p-1.5 z-40 print:hidden text-slate-300 shadow-lg">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleSelectTab(item.id)}
                            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 text-[11px] font-medium transition relative ${
                                isActive ? "text-yellow-400 font-bold" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            <Icon size={18} />
                            <span className="truncate max-w-full mt-0.5">{item.label}</span>
                            {item.count !== null && item.count > 0 && (
                                <span className="absolute top-0 right-3 bg-red-600 text-white text-[9px] font-bold px-1 rounded-full font-mono">
                                    {item.count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* ------------------------------------------------------------- */}
            {/* 4. DRAWER TIỆN ÍCH TRUỢT CHO DI ĐỘNG (MOBILE OVERLAY MENU)     */}
            {/* ------------------------------------------------------------- */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex justify-end bg-black/60 print:hidden">
                    <div className="w-4/5 max-w-xs bg-slate-900 text-slate-100 h-full p-4 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right">
                        <div>
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                <h3 className="font-extrabold text-sm text-yellow-300 uppercase">TIỆN ÍCH HỆ THỐNG</h3>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-slate-400 hover:text-white p-1"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="mt-4 space-y-2">
                                <button
                                    onClick={() => {
                                        onExport();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-bold border border-slate-700"
                                >
                                    <Download size={16} className="text-yellow-400" /> Tải File Sao Lưu (.JSON)
                                </button>

                                <label className="w-full flex items-center gap-3 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-bold border border-slate-700 cursor-pointer">
                                    <Upload size={16} className="text-emerald-400" /> Nạp Dữ Liệu Từ File
                                    <input
                                        type="file"
                                        accept=".json"
                                        onChange={(e) => {
                                            onImport(e);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="hidden"
                                    />
                                </label>

                                <button
                                    onClick={() => {
                                        onPrint();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 bg-amber-600 hover:bg-amber-700 text-slate-950 rounded text-xs font-bold shadow"
                                >
                                    <Printer size={16} /> In Báo Cáo UBND Xã (A4)
                                </button>
                            </div>
                        </div>

                        <div className="text-center text-[10px] text-slate-500 border-t border-slate-800 pt-3">
                            Sổ Tay Quản Lý Ấp Số v2.4 <br /> Tự động đồng bộ bộ nhớ máy
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
