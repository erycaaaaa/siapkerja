// app/page.tsx
"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { CategorySidebar } from "./components/CategorySidebar";
import { ChecklistPanel } from "./components/ChecklistPanel";
import { ProgressSummary } from "./components/ProgressSummary";
import { RecommendationModal } from "./components/RecommendationModal";
import type { Category, ChecklistItem } from "./types/checklist";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category["id"]>("cv");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const [categories, setCategories] = useState<Category[]>([
    {
      id: "cv",
      name: "CV & Portofolio",
      icon: "folder",
      description:
        "Pastikan CV dan portofolio kamu sudah profesional dan menarik perhatian recruiter.",
      items: [
        { id: "cv-1", text: "CV sudah 1 halaman dan rapi", completed: false },
        {
          id: "cv-2",
          text: "Sudah menuliskan pengalaman proyek/organisasi",
          completed: false,
        },
        {
          id: "cv-3",
          text: "Hard skill & soft skill relevan",
          completed: false,
        },
        {
          id: "cv-4",
          text: "Portofolio tersedia (website/Notion/Drive)",
          completed: false,
        },
        { id: "cv-5", text: "Bebas typo", completed: false },
        {
          id: "cv-6",
          text: "Menggunakan format profesional",
          completed: false,
        },
        {
          id: "cv-7",
          text: "Versi CV sesuai posisi",
          completed: false,
        },
        {
          id: "cv-8",
          text: "Foto profesional (opsional)",
          completed: false,
        },
      ],
    },
    {
      id: "selection",
      name: "Pemahaman Alur Seleksi",
      icon: "flowchart",
      description:
        "Kenali tahapan seleksi yang akan kamu lalui agar lebih percaya diri.",
      items: [
        {
          id: "sel-1",
          text: "Memahami proses screening CV",
          completed: false,
        },
        {
          id: "sel-2",
          text: "Tahu cara kerja ATS (Applicant Tracking System)",
          completed: false,
        },
        {
          id: "sel-3",
          text: "Memahami tahapan tes psikotes/kognitif",
          completed: false,
        },
        {
          id: "sel-4",
          text: "Familiar dengan user interview & HR interview",
          completed: false,
        },
        {
          id: "sel-5",
          text: "Mengetahui format assessment center/case study",
          completed: false,
        },
      ],
    },
    {
      id: "interview",
      name: "Persiapan Interview",
      icon: "chat",
      description:
        "Persiapkan diri untuk menjawab pertanyaan interview dengan percaya diri.",
      items: [
        {
          id: "int-1",
          text: "Sudah riset perusahaan target",
          completed: false,
        },
        {
          id: "int-2",
          text: 'Siapkan jawaban "Tell me about yourself"',
          completed: false,
        },
        {
          id: "int-3",
          text: "Siapkan contoh STAR (Situation, Task, Action, Result)",
          completed: false,
        },
        {
          id: "int-4",
          text: "Latihan mock interview dengan teman/mentor",
          completed: false,
        },
        {
          id: "int-5",
          text: "Siapkan pertanyaan untuk interviewer",
          completed: false,
        },
        {
          id: "int-6",
          text: "Pakaian dan penampilan profesional",
          completed: false,
        },
      ],
    },
    {
      id: "skills",
      name: "Skill Readiness",
      icon: "rocket",
      description:
        "Pastikan skill teknis dan non-teknis kamu sesuai dengan posisi yang dilamar.",
      items: [
        {
          id: "skl-1",
          text: "Hard skill sesuai job description",
          completed: false,
        },
        {
          id: "skl-2",
          text: "Sudah mengikuti kursus/sertifikasi relevan",
          completed: false,
        },
        {
          id: "skl-3",
          text: "Punya proyek praktis yang bisa dipresentasikan",
          completed: false,
        },
        {
          id: "skl-4",
          text: "Soft skill komunikasi & teamwork terasah",
          completed: false,
        },
        {
          id: "skl-5",
          text: "Kemampuan problem solving dilatih",
          completed: false,
        },
      ],
    },
    {
      id: "mental",
      name: "Mental Readiness",
      icon: "heart",
      description:
        "Jaga kondisi mental dan emosional agar tetap optimal selama proses seleksi.",
      items: [
        {
          id: "men-1",
          text: "Mindset positif dan terbuka dengan feedback",
          completed: false,
        },
        {
          id: "men-2",
          text: "Tidak terlalu cemas dengan hasil",
          completed: false,
        },
        {
          id: "men-3",
          text: "Punya support system (keluarga/teman)",
          completed: false,
        },
        {
          id: "men-4",
          text: "Istirahat cukup sebelum interview",
          completed: false,
        },
        {
          id: "men-5",
          text: "Siap dengan rencana B jika tidak diterima",
          completed: false,
        },
      ],
    },
    {
      id: "aftercare",
      name: "After-Interview Care",
      icon: "flag",
      description:
        "Langkah-langkah penting setelah interview untuk meningkatkan peluang kamu.",
      items: [
        {
          id: "aft-1",
          text: "Kirim thank you email dalam 24 jam",
          completed: false,
        },
        {
          id: "aft-2",
          text:
            "Follow up jika belum ada kabar dalam waktu yang dijanjikan",
          completed: false,
        },
        {
          id: "aft-3",
          text: "Catat feedback untuk perbaikan ke depan",
          completed: false,
        },
        {
          id: "aft-4",
          text: "Tetap apply ke perusahaan lain",
          completed: false,
        },
        {
          id: "aft-5",
          text: "Evaluasi performa interview",
          completed: false,
        },
      ],
    },
  ]);

  const toggleItem = (
    categoryId: Category["id"],
    itemId: ChecklistItem["id"],
  ) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item,
              ),
            }
          : cat,
      ),
    );
  };

  const calculateTotalProgress = () => {
    const totalItems = categories.reduce(
      (sum, cat) => sum + cat.items.length,
      0,
    );
    const completedItems = categories.reduce(
      (sum, cat) => sum + cat.items.filter((item) => item.completed).length,
      0,
    );
    return totalItems > 0
      ? Math.round((completedItems / totalItems) * 100)
      : 0;
  };

  const currentCategory = categories.find(
    (cat) => cat.id === selectedCategory,
  );

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <Header />

      <main className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-gray-900 mb-3">Job Readiness Checklist</h1>
          <p className="text-gray-600">
            Centang item yang sesuai dengan kondisi kamu untuk mengetahui
            tingkat kesiapan dalam mengikuti proses seleksi kerja.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-4">
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Checklist Panel */}
          <div className="lg:col-span-8">
            {currentCategory && (
              <ChecklistPanel
                category={currentCategory}
                onToggleItem={toggleItem}
              />
            )}
          </div>
        </div>

        {/* Progress Summary */}
        <ProgressSummary
          progress={calculateTotalProgress()}
          onShowRecommendations={() => setShowRecommendations(true)}
        />
      </main>

      {/* Recommendation Modal */}
      {showRecommendations && (
        <RecommendationModal
          categories={categories}
          onClose={() => setShowRecommendations(false)}
        />
      )}
    </div>
  );
}
