const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Đã kết nối thành công với MongoDB Atlas!"))
  .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

// Định nghĩa Schema (Cấu trúc dữ liệu cuộc họp)
const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // Chi bộ, Ban phát triển, Cử tri...
  dateTime: { type: Date, required: true },
  location: { type: String, required: true },
  attendees: { type: String, required: true },
  status: { type: String, default: "UPCOMING" }, // UPCOMING, COMPLETED, CANCELLED
  notes: { type: String },
  minutes: { type: String } // Biên bản họp / kết luận
}, { timestamps: true });

const Meeting = mongoose.model('Meeting', meetingSchema);

// --- CÁC API ENDPOINTS ---

// 1. Lấy danh sách tất cả cuộc họp
app.get('/api/meetings', async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ dateTime: 1 });
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Thêm mới cuộc họp
app.post('/api/meetings', async (req, res) => {
  try {
    const newMeeting = new Meeting(req.body);
    const savedMeeting = await newMeeting.save();
    res.status(201).json(savedMeeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. Cập nhật cuộc họp (Sửa thông tin hoặc cập nhật biên bản/trạng thái)
app.put('/api/meetings/:id', async (req, res) => {
  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedMeeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Xóa cuộc họp
app.delete('/api/meetings/:id', async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa cuộc họp thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại cổng http://localhost:${PORT}`);
});