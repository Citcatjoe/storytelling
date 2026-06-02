"use client";

import React from "react";

interface FilterCheckboxProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  color?: "emerald" | "blue" | "amber";
}

export function FilterCheckbox({ 
  id, 
  label, 
  checked = false, 
  onChange,
  color = "emerald"
}: FilterCheckboxProps) {
  
  const colorClasses = {
    emerald: "border-emerald-300 checked:bg-emerald-500 checked:border-emerald-500 group-hover:border-emerald-500 group-hover:text-emerald-700",
    blue: "border-blue-300 checked:bg-blue-500 checked:border-blue-500 group-hover:border-blue-500 group-hover:text-blue-700",
    amber: "border-amber-300 checked:bg-amber-500 checked:border-amber-500 group-hover:border-amber-500 group-hover:text-amber-700",
  }[color];

  const textColor = {
    emerald: "group-hover:text-emerald-700",
    blue: "group-hover:text-blue-700",
    amber: "group-hover:text-amber-700",
  }[color];

  return (
    <label className="flex items-center gap-3 cursor-pointer group py-1.5 transition-all duration-200 px-1 rounded-md hover:bg-black/5">
      <div className="relative flex items-center justify-center shrink-0">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className={`
            peer appearance-none 
            w-6 h-6 border-2  
            bg-white 
            transition-all duration-200 
            cursor-pointer
            ${colorClasses}
          `}
        />
        {/* SVG Checkmark */}
        <svg
          className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span 
        className={`text-sm font-medium text-gray-700 select-none transition-colors ${textColor}`}
      >
        {label}
      </span>
    </label>
  );
}
