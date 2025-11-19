import { CircularProgress } from './CircularProgress';
import { Download, TrendingUp } from 'lucide-react';

interface ProgressSummaryProps {
  progress: number;
  onShowRecommendations: () => void;
}

export function ProgressSummary({ progress, onShowRecommendations }: ProgressSummaryProps) {
  const getProgressMessage = () => {
    if (progress <= 40) {
      return {
        text: 'Kamu baru mulai persiapan. Jangan khawatir, ikuti checklist dari atas!',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
      };
    } else if (progress <= 70) {
      return {
        text: 'Dasar kamu sudah bagus, lanjutkan memperbaiki area tertentu.',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
      };
    } else if (progress <= 90) {
      return {
        text: 'Kamu sangat siap! Tinggal memperkuat hal-hal kecil.',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
      };
    } else {
      return {
        text: 'Kesiapan maksimal. Kamu siap masuk seleksi kerja!',
        color: 'text-[#7091F5]',
        bgColor: 'bg-blue-50',
      };
    }
  };

  const message = getProgressMessage();

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-8">
      <h2 className="text-gray-900 mb-8 text-center">Skor Kesiapan Kamu</h2>
      
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Circular Progress */}
        <div className="shrink-0">
          <CircularProgress progress={progress} />
        </div>

        {/* Progress Message & Actions */}
        <div className="flex-1 text-center lg:text-left">
          <div className={`${message.bgColor} ${message.color} rounded-xl p-6 mb-6`}>
            <p style={{ fontSize: '18px', fontWeight: 500 }}>
              {message.text}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={onShowRecommendations}
              className="px-6 py-3 bg-[#7091F5] text-white rounded-xl hover:bg-[#5f7de6] transition-all duration-200 shadow-lg shadow-[#7091F5]/25 flex items-center justify-center gap-2"
              style={{ fontSize: '16px', fontWeight: 600 }}
            >
              <TrendingUp className="w-5 h-5" />
              Lihat Rekomendasi Perbaikan
            </button>
            
            <button
              className="px-6 py-3 bg-white text-gray-700 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
              style={{ fontSize: '16px', fontWeight: 600 }}
            >
              <Download className="w-5 h-5" />
              Download Hasil (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
