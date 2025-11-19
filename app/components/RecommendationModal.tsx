"use client";

import { motion } from "framer-motion";
import {
  X,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// Definisi type lokal, tidak lagi import dari "../App"
interface ChecklistItem {
  id: string | number;
  text: string;
  completed: boolean;
}

interface Category {
  id: string | number;
  name: string;
  items: ChecklistItem[];
}

interface RecommendationModalProps {
  categories: Category[];
  onClose: () => void;
}

export function RecommendationModal({
  categories,
  onClose,
}: RecommendationModalProps) {
  // Calculate strengths (categories with >70% completion)
  const strengths = categories.filter((cat) => {
    const completedItems = cat.items.filter(
      (item: ChecklistItem) => item.completed,
    ).length;
    const percentage = (completedItems / cat.items.length) * 100;
    return percentage > 70;
  });

  // Calculate areas to improve (categories with <=70% completion)
  const improvements = categories.filter((cat) => {
    const completedItems = cat.items.filter(
      (item: ChecklistItem) => item.completed,
    ).length;
    const percentage = (completedItems / cat.items.length) * 100;
    return percentage <= 70;
  });

  // Get incomplete items from low-completion categories
  const incompleteItems = improvements
    .flatMap((cat) =>
      cat.items
        .filter((item: ChecklistItem) => !item.completed)
        .slice(0, 2)
        .map((item: ChecklistItem) => ({
          category: cat.name,
          text: item.text,
        })),
    )
    .slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between rounded-t-2xl border-b border-gray-200 bg-white p-6">
          <h2 className="text-gray-900">
            Rekomendasi Berdasarkan Checklist Kamu
          </h2>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Strengths */}
          <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="mb-2 text-gray-900">Kekuatan Kamu</h3>
                <p className="text-gray-700">
                  Area yang sudah kamu kuasai dengan baik
                </p>
              </div>
            </div>

            {strengths.length > 0 ? (
              <ul className="space-y-2">
                {strengths.map((cat) => {
                  const completedItems = cat.items.filter(
                    (item: ChecklistItem) => item.completed,
                  ).length;
                  const percentage = Math.round(
                    (completedItems / cat.items.length) * 100,
                  );

                  return (
                    <li
                      key={cat.id}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <div className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                      <span>
                        <strong>{cat.name}</strong> ({percentage}% selesai)
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-600">
                Terus tingkatkan penyelesaian checklist untuk membangun
                kekuatan kamu!
              </p>
            )}
          </div>

          {/* Areas to Improve */}
          <div className="rounded-xl border-2 border-yellow-200 bg-yellow-50 p-6">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="mb-2 text-gray-900">
                  Area yang Perlu Diperbaiki
                </h3>
                <p className="text-gray-700">
                  Fokus pada area ini untuk meningkatkan skor kesiapan
                </p>
              </div>
            </div>

            {improvements.length > 0 ? (
              <ul className="space-y-2">
                {improvements.map((cat) => {
                  const completedItems = cat.items.filter(
                    (item: ChecklistItem) => item.completed,
                  ).length;
                  const percentage = Math.round(
                    (completedItems / cat.items.length) * 100,
                  );

                  return (
                    <li
                      key={cat.id}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <div className="h-2 w-2 shrink-0 rounded-full bg-yellow-500" />
                      <span>
                        <strong>{cat.name}</strong> ({percentage}% selesai)
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-600">
                Luar biasa! Semua area sudah dalam kondisi baik.
              </p>
            )}
          </div>

          {/* Next Steps */}
          <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7091F5]">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="mb-2 text-gray-900">Langkah Selanjutnya</h3>
                <p className="text-gray-700">
                  Prioritaskan item-item ini untuk hasil maksimal
                </p>
              </div>
            </div>

            {incompleteItems.length > 0 ? (
              <ul className="space-y-3">
                {incompleteItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-[#7091F5]" />
                    <div>
                      <span
                        className="text-gray-600"
                        style={{ fontSize: "14px" }}
                      >
                        {item.category}
                      </span>
                      <p
                        className="text-gray-900"
                        style={{ fontSize: "15px", fontWeight: 500 }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">
                Selamat! Semua item sudah tercentang. Kamu siap untuk seleksi
                kerja! 🎉
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 rounded-b-2xl border-t border-gray-200 bg-white p-6">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-[#7091F5] px-6 py-3 text-white shadow-lg shadow-[#7091F5]/25 transition-all duration-200 hover:bg-[#5f7de6]"
            style={{ fontSize: "16px", fontWeight: 600 }}
          >
            Oke, Mengerti
          </button>
        </div>
      </motion.div>
    </div>
  );
}
