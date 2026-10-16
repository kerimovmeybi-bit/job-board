import React from 'react';
import { Briefcase, Plus, Heart } from 'lucide-react';

interface NavbarProps {
  onOpenCreateModal: () => void;
  jobCount: number;
  showBookmarksOnly: boolean;
  onToggleBookmarksFilter: () => void;
  bookmarksCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCreateModal,
  jobCount,
  showBookmarksOnly,
  onToggleBookmarksFilter,
  bookmarksCount,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2.5 rounded-2xl shadow-lg shadow-blue-600/30">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-100 tracking-tight">
                DevJobs <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Remote</span>
              </h1>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-xs text-slate-400">{jobCount} активных вакансий</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleBookmarksFilter}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-semibold transition-all ${
              showBookmarksOnly
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-lg shadow-rose-500/10'
                : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${showBookmarksOnly ? 'fill-current text-rose-500' : ''}`} />
            <span className="hidden sm:inline">Избранное</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded-lg text-xs border border-slate-700">
              {bookmarksCount}
            </span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-4 py-2.5 rounded-2xl transition-all shadow-lg shadow-blue-600/25 text-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Разместить вакансию</span>
          </button>
        </div>
      </div>
    </header>
  );
};