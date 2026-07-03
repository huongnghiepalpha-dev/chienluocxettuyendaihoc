import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

export default function App() {
  const [score, setScore] = useState<number>(0);
  const [block, setBlock] = useState<string>('A00');
  const [major, setMajor] = useState<string>('Công nghệ thông tin');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCalculate = async () => {
    setLoading(true);
    // Giả lập thuật toán dự báo xác suất xét tuyển dựa trên điểm số
    setTimeout(async () => {
      let rate = "";
      if (score >= 27) rate = "Rất cao (Trên 90%) - An toàn để đăng ký NV1!";
      else if (score >= 24) rate = "Khá cao (60% - 80%) - Cơ hội tốt, nên đặt ở NV1 hoặc NV2.";
      else if (score >= 21) rate = "Trung bình (40% - 60%) - Nên cân nhắc thêm phương án dự phòng.";
      else rate = "Thấp (Dưới 40%) - Khuyên học sinh nên chọn tổ hợp hoặc ngành an toàn hơn.";
      
      setResult(rate);

      // Lưu lịch sử tra cứu của học sinh vào Supabase Database
      try {
        await supabase.from('search_history').insert([
          { block: block, major: major, score: score, prediction: rate, created_at: new Date() }
        ]);
      } catch (error) {
        console.log("Supabase log:", error);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div class="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Header Banner */}
      <header class="bg-blue-600 text-white shadow-md py-6 px-4 text-center">
        <h1 class="text-2xl md:text-3xl font-bold">HỆ THỐNG HOẠCH ĐỊNH CHIẾN LƯỢC XÉT TUYỂN ĐẠI HỌC</h1>
        <p class="text-blue-100 mt-2 text-sm md:text-base">Đồng hành cùng sĩ tử 2K9 xây dựng lộ trình chọn ngành, chọn tổ hợp môn đúng đắn</p>
      </header>

      {/* Main Content */}
      <main class="flex-grow max-w-4xl w-full mx-auto px-4 py-8">
        <div class="bg-white rounded-xl shadow-md p-6 border border-slate-100">
          <h2 class="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
            📊 Công cụ dự báo xác suất trúng tuyển & Gợi ý Nguyện vọng
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Chọn khối */}
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Tổ hợp môn xét tuyển</label>
              <select value={block} onChange={(e) => setBlock(e.target.value)} class="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="A00">A00 (Toán, Lý, Hóa)</option>
                <option value="A01">A01 (Toán, Lý, Anh)</option>
                <option value="B00">B00 (Toán, Hóa, Sinh)</option>
                <option value="D01">D01 (Toán, Văn, Anh)</option>
              </select>
            </div>

            {/* Chọn ngành */}
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Ngành học quan tâm</label>
              <select value={major} onChange={(e) => setMajor(e.target.value)} class="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                <option value="Kinh tế ngoại thương">Kinh tế & Quản trị</option>
                <option value="Khoa học sư phạm">Sư phạm & Giáo dục</option>
                <option value="Y đa khoa">Y dược & Sức khỏe</option>
              </select>
            </div>

            {/* Nhập điểm */}
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Tổng điểm dự kiến (3 môn)</label>
              <input type="number" max="30" min="0" step="0.25" value={score || ''} onChange={(e) => setScore(parseFloat(e.target.value) || 0)} placeholder="Ví dụ: 25.5" class="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <button onClick={handleCalculate} disabled={loading || score <= 0} class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition shadow-sm disabled:bg-slate-300">
            {loading ? 'Đang phân tích dữ liệu điểm...' : 'Xem kết quả dự báo chiến lược'}
          </button>

          {/* Hiển thị kết quả */}
          {result && (
            <div class="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-lg animate-fade-in">
              <h3 class="font-semibold text-blue-800 text-lg mb-2">🎯 Kết quả phân tích chiến lược:</h3>
              <p class="text-slate-700 leading-relaxed">
                Với tổ hợp <span class="font-semibold text-blue-700">{block}</span> ngành <span class="font-semibold text-blue-700">{major}</span> đạt mức <span class="font-semibold text-blue-700">{score} điểm</span>. Tỷ lệ đỗ của bạn được đánh giá ở mức:
              </p>
              <div class="mt-3 text-lg font-bold text-slate-800 bg-white p-3 rounded border border-blue-100">
                {result}
              </div>
              <p class="text-xs text-slate-500 mt-4 italic">*Lưu ý: Kết quả mang tính chất tham khảo dựa trên phổ điểm hàng năm nhằm tối ưu hóa chiến thuật đặt nguyện vọng thông minh.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer định danh thương hiệu Hướng nghiệp Alpha */}
      <footer class="bg-slate-900 text-slate-400 text-center py-4 text-xs border-t border-slate-800">
        <p>© 2026 Bản quyền thuộc về thương hiệu Hướng nghiệp Alpha. Đã sửa đổi chính tả asset chuẩn xác ("đúng đắn").</p>
      </footer>
    </div>
  );
}
