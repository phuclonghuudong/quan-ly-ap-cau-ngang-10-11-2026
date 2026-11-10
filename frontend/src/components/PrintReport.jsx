import React from "react";

export default function PrintReport({tasks, members, logs, targets}) {
    const currentDate = new Date().toLocaleDateString("vi-VN");

    return (
        <div className="hidden print:block p-8 bg-white text-black font-serif text-sm leading-relaxed">
            <div className="flex justify-between items-start text-xs font-bold uppercase mb-6">
                <div className="text-center">
                    <p>UBND XÃ / PHƯỜNG .........</p>
                    <p className="underline">BAN NHÂN DÂN ẤP .........</p>
                </div>
                <div className="text-center">
                    <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                    <p className="underline">Độc lập - Tự do - Hạnh phúc</p>
                </div>
            </div>

            <h1 className="text-xl font-bold text-center uppercase tracking-wide mb-2">
                BÁO CÁO TÌNH HÌNH TÁC NGHIỆP CƠ SỞ CẤP ẤP
            </h1>
            <p className="text-center text-xs italic mb-6">Ngày lập báo cáo: {currentDate}</p>

            {/* I. Công việc */}
            <div className="space-y-2 mb-6">
                <h2 className="font-bold text-sm uppercase">I. Tổng hợp tiến độ nhiệm vụ</h2>
                <table className="w-full border-collapse border border-black text-xs">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-black p-1.5">STT</th>
                            <th className="border border-black p-1.5">Nội dung công việc</th>
                            <th className="border border-black p-1.5">Mảng</th>
                            <th className="border border-black p-1.5">Trạng thái</th>
                            <th className="border border-black p-1.5">Tiến độ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((t, idx) => (
                            <tr key={t.id}>
                                <td className="border border-black p-1.5 text-center">{idx + 1}</td>
                                <td className="border border-black p-1.5 font-bold">{t.title}</td>
                                <td className="border border-black p-1.5 text-center">{t.category}</td>
                                <td className="border border-black p-1.5 text-center">{t.status}</td>
                                <td className="border border-black p-1.5 text-center font-bold">{t.progress}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Chữ ký */}
            <div className="grid grid-cols-2 text-center text-xs mt-12">
                <div></div>
                <div>
                    <div className="font-bold uppercase">TRƯỞNG ẤP</div>
                    <div className="italic text-[10px] text-gray-500 mb-12">(Ký và ghi rõ họ tên)</div>
                    <div className="font-bold">Nguyễn Văn Minh</div>
                </div>
            </div>
        </div>
    );
}
