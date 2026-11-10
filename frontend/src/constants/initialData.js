export const INITIAL_MEMBERS = [
  {
    id: "m1",
    name: "Nguyễn Văn Minh",
    role: "Bí thư kiêm Trưởng ấp",
    phone: "0912345678",
    area: "Toàn ấp (Phụ trách chung)",
    households: 285,
    note: "Trực tiếp chỉ đạo Hạ tầng & An ninh",
  },
  {
    id: "m2",
    name: "Trần Thị Mỹ",
    role: "Phó ấp",
    phone: "0987654321",
    area: "Tổ 1 & Tổ 2",
    households: 110,
    note: "Phụ trách BHYT & Chế độ chính sách",
  },
  {
    id: "m3",
    name: "Lê Văn Tám",
    role: "Công an viên ấp",
    phone: "0933112233",
    area: "Toàn ấp",
    households: 285,
    note: "Quản lý tạm trú, trọ, ANTT",
  },
  {
    id: "m4",
    name: "Phạm Văn Hùng",
    role: "Trưởng ban CT Mặt trận",
    phone: "0908999888",
    area: "Tổ 3 & Tổ 4",
    households: 105,
    note: "Vận động Quỹ & Tuyên truyền",
  },
];

export const INITIAL_TASKS = [
  {
    id: "t1",
    title: "Rà soát & Vận động 42 hộ chưa gia hạn BHYT quý IV",
    category: "BHYT Hộ gia đình",
    priority: "Khẩn cấp",
    deadline: "2026-11-20",
    status: "Đang làm",
    assigneeId: "m2",
    progress: 65,
    description:
      "Tập trung Tổ 1 và Tổ 3. Gửi danh sách cho Tổ trưởng đi nhắc từng nhà.",
  },
  {
    id: "t2",
    title: "Nghiệm thu công trình đóng cừ tràm giữ lề đường Tuyến 3",
    category: "Hạ tầng giao thông",
    priority: "Cao",
    deadline: "2026-11-15",
    status: "Đang làm",
    assigneeId: "m1",
    progress: 80,
    description: "Thi công 450m cừ tràm tuyến kênh rạch.",
  },
];

export const INITIAL_LOGS = [
  {
    id: "l1",
    date: "2026-11-08",
    title:
      "Hòa giải tranh chấp mương thoát nước giữa hộ ông Hai & hộ bà Ba (Tổ 2)",
    category: "Hòa giải & Ranh giới",
    status: "Đã giải quyết",
    content:
      "Hai bên nhất trí khôi phục mương thoát nước rộng 0.8m theo hiện trạng bản đồ.",
  },
];

export const INITIAL_TARGETS = [
  {
    id: "tg1",
    name: "Bảo hiểm Y tế Hộ gia đình",
    current: 254,
    target: 285,
    unit: "hộ",
    type: "percent",
    category: "Chính sách",
  },
  {
    id: "tg2",
    name: "Quỹ Vì Người Nghèo",
    current: 14250000,
    target: 15000000,
    unit: "VNĐ",
    type: "money",
    category: "Thu quỹ",
  },
  {
    id: "tg3",
    name: "Quỹ Đền Ơn Đáp Nghĩa",
    current: 10500000,
    target: 14250000,
    unit: "VNĐ",
    type: "money",
    category: "Thu quỹ",
  },
];
