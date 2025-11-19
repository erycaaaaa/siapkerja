"use client";

import * as React from "react";
import { FolderOpen, GitBranch, MessageCircle, Rocket, Heart, Flag } from "lucide-react";

// ---- Definisi tipe lokal (bisa nanti dipindah ke file types.ts terpisah) ----

interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // "folder" | "flowchart" | "chat" | "rocket" | "heart" | "flag"
  items: ChecklistItem[];
}

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

// ---------------------------------------------------------------------------

const iconMap: Record<string, React.ElementType> = {
  folder: FolderOpen,
  flowchart: GitBranch,
  chat: MessageCircle,
  rocket: Rocket,
  heart: Heart,
  flag: Flag,
};

export function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <div className="space-y-3">
      {categories.map((category) => {
        const Icon = iconMap[category.icon] || FolderOpen;

        const completedItems = category.items.filter((item) => item.completed).length;
        const totalItems = category.items.length;
        const isSelected = category.id === selectedCategory;
        const progressPercent = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full text-left p-5 rounded-2xl transition-all duration-200 ${
              isSelected
                ? "bg-[#7091F5]/10 border-2 border-[#7091F5] shadow-md"
                : "bg-white border-2 border-transparent hover:border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isSelected ? "bg-[#7091F5] text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  className={`mb-2 ${isSelected ? "text-gray-900" : "text-gray-700"}`}
                  style={{ fontSize: "16px", fontWeight: isSelected ? 700 : 600 }}
                >
                  {category.name}
                </h3>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-[#7091F5] to-[#6CCF8E] transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <p className="text-gray-600" style={{ fontSize: "14px" }}>
                  {completedItems}/{totalItems} tasks completed
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
