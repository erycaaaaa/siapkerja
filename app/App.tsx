// app/page.tsx
"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { CategorySidebar } from "./components/CategorySidebar";
import { ChecklistPanel } from "./components/ChecklistPanel";
import { ProgressSummary } from "./components/ProgressSummary";
import { RecommendationModal } from "./components/RecommendationModal";
import type { Category } from "./types/checklist";
import type { ChecklistItem } from "./types/checklist";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category["id"]>("cv");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    // … isi kategori yang sudah kamu tulis tadi (cv, selection, interview, dll)
  ]);

  const toggleItem = (categoryId: Category["id"], itemId: ChecklistItem["id"]) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : cat
      )
    );
  };

  const calculateTotalProgress = () => {
    const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
    const completedItems = categories.reduce(
      (sum, cat) => sum + cat.items.filter((item) => item.completed).length,
      0
    );
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <Header />

      <main className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-gray-900 mb-3">Job Readiness Checklist</h1>
          <p className="text-gray-600">
            Centang item yang sesuai dengan kondisi kamu untuk mengetahui tingkat kesiapan dalam mengikuti proses seleksi kerja.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-4">
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          <div className="lg:col-span-8">
            {currentCategory && (
              <ChecklistPanel
                category={currentCategory}
                onToggleItem={toggleItem}
              />
            )}
          </div>
        </div>

        <ProgressSummary
          progress={calculateTotalProgress()}
          onShowRecommendations={() => setShowRecommendations(true)}
        />
      </main>

      {showRecommendations && (
        <RecommendationModal
          categories={categories}
          onClose={() => setShowRecommendations(false)}
        />
      )}
    </div>
  );
}
