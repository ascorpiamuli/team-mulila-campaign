// components/docs/SidebarNav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  FileText
} from "lucide-react";

interface SidebarNavProps {
  categories: Category[];
  currentResourceId: string;
  currentCategoryId: string;
}

export function SidebarNav({ categories, currentResourceId, currentCategoryId }: SidebarNavProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([currentCategoryId]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getDifficultyColor = (difficulty: string | null | undefined) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10';
      case 'Intermediate': return 'text-amber-400 bg-amber-400/10';
      case 'Advanced': return 'text-orange-400 bg-orange-400/10';
      case 'Expert': return 'text-red-400 bg-red-400/10';
      default: return 'text-text-dim bg-bg-secondary';
    }
  };

  const getDifficultyAbbrev = (difficulty: string | null | undefined) => {
    switch (difficulty) {
      case 'Beginner': return 'B';
      case 'Intermediate': return 'I';
      case 'Advanced': return 'A';
      case 'Expert': return 'E';
      default: return '';
    }
  };

  return (
    <nav className="space-y-1">
      {categories.map((category) => (
        <div key={category.id} className="mb-2">
          {/* Category Header */}
          <button
            onClick={() => toggleCategory(category.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${category.id === currentCategoryId
                ? 'bg-green-primary/10 text-green-primary'
                : 'hover:bg-green-primary/5 text-text-dim hover:text-green-primary'
              }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color}`} />
              <span className="font-mono text-sm font-medium">{category.title}</span>
            </div>
            {expandedCategories.includes(category.id) ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {/* Category Resources */}
          {expandedCategories.includes(category.id) && (
            <div className="ml-4 mt-1 space-y-1">
              {category.resources?.map((resource) => (
                <Link
                  key={resource.id}
                  href={resource.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors group ${resource.id === currentResourceId
                      ? 'bg-green-primary/10 text-green-primary'
                      : 'hover:bg-green-primary/5 text-text-dim hover:text-green-primary'
                    }`}
                >
                  <FileText className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="flex-1 font-mono text-sm truncate">
                    {resource.title}
                  </span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${getDifficultyColor(resource.difficulty)}`}>
                    {getDifficultyAbbrev(resource.difficulty)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
