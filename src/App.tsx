import React from 'react';
import { User, Target, BarChart2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Chiến lược Xét tuyển 2026</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phần Hồ sơ năng lực */}
        <div className="col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <User className="text-blue-500" /> Hồ sơ năng lực
          </h2>
          {/* Sẽ thêm Radar Chart vào đây */}
          <div className="h-48 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
            Biểu đồ Radar sẽ hiển thị tại đây
          </div>
        </div>

        {/* Phần Dashboard thông tin */}
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Target className="text-orange-500" /> Thông tin mục tiêu
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-slate-500">IELTS</p>
              <p className="text-xl font-bold">7.5</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-slate-500">SAT</p>
              <p className="text-xl font-bold">1480</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
