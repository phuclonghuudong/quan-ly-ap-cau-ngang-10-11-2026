import React, {useState, useEffect} from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import TaskManager from "./components/TaskManager";
import MemberManager from "./components/MemberManager";
import JournalManager from "./components/JournalManager";
import TargetManager from "./components/TargetManager";
import PrintReport from "./components/PrintReport";

import TaskModal from "./modals/TaskModal";
import MemberModal from "./modals/MemberModal";
import LogModal from "./modals/LogModal";
import TargetModal from "./modals/TargetModal";

import {INITIAL_MEMBERS, INITIAL_TASKS, INITIAL_LOGS, INITIAL_TARGETS} from "./constants/initialData";
import {Plus, Printer} from "lucide-react";

export default function App() {
    const [activeTab, setActiveTab] = useState("dashboard");

    const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("ap_v2_tasks")) || INITIAL_TASKS);
    const [members, setMembers] = useState(() => JSON.parse(localStorage.getItem("ap_v2_members")) || INITIAL_MEMBERS);
    const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem("ap_v2_logs")) || INITIAL_LOGS);
    const [targets, setTargets] = useState(() => JSON.parse(localStorage.getItem("ap_v2_targets")) || INITIAL_TARGETS);

    // Modals state
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);

    const [isLogModalOpen, setIsLogModalOpen] = useState(false);
    const [editingLog, setEditingLog] = useState(null);

    const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
    const [editingTarget, setEditingTarget] = useState(null);

    // Sync localStorage
    useEffect(() => {
        localStorage.setItem("ap_v2_tasks", JSON.stringify(tasks));
    }, [tasks]);
    useEffect(() => {
        localStorage.setItem("ap_v2_members", JSON.stringify(members));
    }, [members]);
    useEffect(() => {
        localStorage.setItem("ap_v2_logs", JSON.stringify(logs));
    }, [logs]);
    useEffect(() => {
        localStorage.setItem("ap_v2_targets", JSON.stringify(targets));
    }, [targets]);

    const handleExportJSON = () => {
        const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify({tasks, members, logs, targets}, null, 2));
        const dl = document.createElement("a");
        dl.setAttribute("href", dataStr);
        dl.setAttribute("download", `SoTayTruongAp_${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(dl);
        dl.click();
        dl.remove();
    };

    const handleImportJSON = (e) => {
        const reader = new FileReader();
        if (e.target.files?.[0]) {
            reader.readAsText(e.target.files[0], "UTF-8");
            reader.onload = (event) => {
                try {
                    const parsed = JSON.parse(event.target.result);
                    if (parsed.tasks) setTasks(parsed.tasks);
                    if (parsed.members) setMembers(parsed.members);
                    if (parsed.logs) setLogs(parsed.logs);
                    if (parsed.targets) setTargets(parsed.targets);
                    alert("Nạp dữ liệu thành công!");
                } catch {
                    alert("File định dạng không hợp lệ!");
                }
            };
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col md:flex-row print:bg-white">
            {/* Header di động */}
            <header className="md:hidden bg-red-950 text-white p-3 flex items-center justify-between sticky top-0 z-40 shadow">
                <h1 className="font-bold text-sm tracking-wide uppercase text-yellow-300">SỔ TAY TRƯỞNG ẤP</h1>
                <button onClick={() => window.print()} className="p-1.5 bg-red-900 rounded">
                    <Printer size={16} />
                </button>
            </header>

            {/* Sidebar điều hướng bên trái */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                counts={{tasks: tasks.length, members: members.length, logs: logs.length}}
                onExport={handleExportJSON}
                onImport={handleImportJSON}
                onPrint={() => window.print()}
            />

            {/* Nội dung chính bên phải */}
            <main className="flex-1 p-3 md:p-6 max-w-7xl mx-auto w-full pb-20 md:pb-6">
                {/* Tiêu đề trang & Nút hành động */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 bg-white p-3.5 rounded-lg border border-slate-300 shadow-sm print:hidden">
                    <div>
                        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                            <span className="w-2.5 h-6 bg-red-700 rounded-sm inline-block"></span>
                            {activeTab === "dashboard" && "TỔNG QUAN TÌNH HÌNH ẤP"}
                            {activeTab === "tasks" && "QUẢN LÝ CÔNG VIỆC & TIẾN ĐỘ"}
                            {activeTab === "members" && "DANH BẠ CÁN BỘ BAN ẤP & TỔ TỰ QUẢN"}
                            {activeTab === "logs" && "NHẬT KÝ THỰC ĐỊA & HÒA GIẢI"}
                            {activeTab === "targets" && "CHỈ TIÊU & QUỸ ĐỊA BÀN"}
                        </h2>
                        <p className="text-xs text-slate-600 mt-0.5">Cập nhật dữ liệu tác nghiệp thực tế cấp cơ sở</p>
                    </div>

                    <div>
                        {activeTab === "tasks" && (
                            <button
                                onClick={() => {
                                    setEditingTask(null);
                                    setIsTaskModalOpen(true);
                                }}
                                className="flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white font-bold px-3.5 py-2 rounded text-xs shadow"
                            >
                                <Plus size={16} /> Giao Việc Mới
                            </button>
                        )}
                        {activeTab === "members" && (
                            <button
                                onClick={() => {
                                    setEditingMember(null);
                                    setIsMemberModalOpen(true);
                                }}
                                className="flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white font-bold px-3.5 py-2 rounded text-xs shadow"
                            >
                                <Plus size={16} /> Thêm Cán Bộ
                            </button>
                        )}
                        {activeTab === "logs" && (
                            <button
                                onClick={() => {
                                    setEditingLog(null);
                                    setIsLogModalOpen(true);
                                }}
                                className="flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white font-bold px-3.5 py-2 rounded text-xs shadow"
                            >
                                <Plus size={16} /> Ghi Nhật Ký
                            </button>
                        )}
                        {activeTab === "targets" && (
                            <button
                                onClick={() => {
                                    setEditingTarget(null);
                                    setIsTargetModalOpen(true);
                                }}
                                className="flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white font-bold px-3.5 py-2 rounded text-xs shadow"
                            >
                                <Plus size={16} /> Thêm Chỉ Tiêu
                            </button>
                        )}
                    </div>
                </div>

                {/* Render các module tương ứng */}
                {activeTab === "dashboard" && (
                    <Dashboard tasks={tasks} members={members} targets={targets} setActiveTab={setActiveTab} />
                )}
                {activeTab === "tasks" && (
                    <TaskManager
                        tasks={tasks}
                        members={members}
                        onEdit={(t) => {
                            setEditingTask(t);
                            setIsTaskModalOpen(true);
                        }}
                        onDelete={(id) => setTasks(tasks.filter((t) => t.id !== id))}
                    />
                )}
                {activeTab === "members" && (
                    <MemberManager
                        members={members}
                        onEdit={(m) => {
                            setEditingMember(m);
                            setIsMemberModalOpen(true);
                        }}
                        onDelete={(id) => setMembers(members.filter((m) => m.id !== id))}
                    />
                )}
                {activeTab === "logs" && (
                    <JournalManager
                        logs={logs}
                        onEdit={(l) => {
                            setEditingLog(l);
                            setIsLogModalOpen(true);
                        }}
                        onDelete={(id) => setLogs(logs.filter((l) => l.id !== id))}
                    />
                )}
                {activeTab === "targets" && (
                    <TargetManager
                        targets={targets}
                        onEdit={(tg) => {
                            setEditingTarget(tg);
                            setIsTargetModalOpen(true);
                        }}
                    />
                )}

                {/* In Báo Cáo A4 */}
                <PrintReport tasks={tasks} members={members} logs={logs} targets={targets} />

                {/* Modals */}
                {isTaskModalOpen && (
                    <TaskModal
                        initialData={editingTask}
                        members={members}
                        onClose={() => setIsTaskModalOpen(false)}
                        onSave={(data) => {
                            if (editingTask)
                                setTasks(tasks.map((t) => (t.id === editingTask.id ? {...data, id: t.id} : t)));
                            else setTasks([{...data, id: "t_" + Date.now()}, ...tasks]);
                            setIsTaskModalOpen(false);
                        }}
                    />
                )}

                {isMemberModalOpen && (
                    <MemberModal
                        initialData={editingMember}
                        onClose={() => setIsMemberModalOpen(false)}
                        onSave={(data) => {
                            if (editingMember)
                                setMembers(members.map((m) => (m.id === editingMember.id ? {...data, id: m.id} : m)));
                            else setMembers([...members, {...data, id: "m_" + Date.now()}]);
                            setIsMemberModalOpen(false);
                        }}
                    />
                )}

                {isLogModalOpen && (
                    <LogModal
                        initialData={editingLog}
                        onClose={() => setIsLogModalOpen(false)}
                        onSave={(data) => {
                            if (editingLog)
                                setLogs(logs.map((l) => (l.id === editingLog.id ? {...data, id: l.id} : l)));
                            else setLogs([{...data, id: "l_" + Date.now()}, ...logs]);
                            setIsLogModalOpen(false);
                        }}
                    />
                )}

                {isTargetModalOpen && (
                    <TargetModal
                        initialData={editingTarget}
                        onClose={() => setIsTargetModalOpen(false)}
                        onSave={(data) => {
                            if (editingTarget)
                                setTargets(
                                    targets.map((tg) => (tg.id === editingTarget.id ? {...data, id: tg.id} : tg))
                                );
                            else setTargets([...targets, {...data, id: "tg_" + Date.now()}]);
                            setIsTargetModalOpen(false);
                        }}
                    />
                )}
            </main>
        </div>
    );
}
