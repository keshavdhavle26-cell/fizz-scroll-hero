import React from 'react';

export default function StatCard({ 
  percentage, 
  description, 
  className = '' 
}) {
  return (
    <div 
      className={`p-6 sm:p-8 rounded-2xl bg-white border border-[#071B35]/12 shadow-md shadow-blue-950/5 flex flex-col justify-between w-56 sm:w-72 select-none ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-[#071B35]">
          {percentage}
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.5)]"></span>
      </div>
      <div className="font-sans text-xs sm:text-sm font-medium tracking-wide text-slate-600 leading-snug">
        {description}
      </div>
    </div>
  );
}
