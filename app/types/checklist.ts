"use client";

import * as React from "react";
import type { Category, ChecklistItem } from "../types/checklist";
import { CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

interface ChecklistPanelProps {
  category: Category;
  onToggleItem: (categoryId: Category["id"], itemId: ChecklistItem["id"]) => void;
}

export function ChecklistPanel({ category, onToggleItem }: ChecklistPanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-8">
      {/* Category Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h2 className="text-gray-900 mb-3">{category.name}</h2>
        {category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        {category.items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <label
              className="flex items-start gap-4 p-4 rounded-xl cursor-pointer group hover:bg-gray-50 transition-all duration-200"
              htmlFor={item.id}
            >
              <div className="relative shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  id={item.id}
                  checked={item.completed}
                  onChange={() => onToggleItem(category.id, item.id)}
                  className="sr-only"
                />

                {item.completed ? (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <CheckCircle2
                      className="w-6 h-6 text-[#6CCF8E]"
                      strokeWidth={2.5}
                    />
                  </motion.div>
                ) : (
                  <Circle
                    className="w-6 h-6 text-gray-300 group-hover:text-gray-400 transition-colors"
                    strokeWidth={2.5}
                  />
                )}
              </div>

              <span
                className={`flex-1 transition-all duration-200 ${
                  item.completed
                    ? "text-gray-500 line-through"
                    : "text-gray-900 group-hover:text-gray-700"
                }`}
                style={{
                  fontSize: "16px",
                  fontWeight: item.completed ? 400 : 500,
                }}
              >
                {item.text}
              </span>
            </label>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
