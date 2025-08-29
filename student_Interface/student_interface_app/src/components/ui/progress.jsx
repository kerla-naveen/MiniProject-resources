import React from "react";

export const Progress = ({ value, className }) => {
  return (
    <div
      className={`relative h-2 w-full overflow-hidden rounded-full bg-slate-200 ${className}`}
    >
      <div
        className="h-full w-full flex-1 bg-indigo-600 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
};
