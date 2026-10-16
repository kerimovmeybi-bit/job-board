import React from 'react';

export const JobSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 animate-pulse space-y-4">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-slate-700/80 rounded-2xl shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-slate-700/80 rounded-lg w-1/4" />
          <div className="h-5 bg-slate-700/80 rounded-lg w-2/3" />
          <div className="h-3 bg-slate-700/80 rounded-lg w-1/3" />
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <div className="h-6 bg-slate-700/80 rounded-md w-16" />
        <div className="h-6 bg-slate-700/80 rounded-md w-20" />
        <div className="h-6 bg-slate-700/80 rounded-md w-14" />
      </div>
    </div>
  );
};