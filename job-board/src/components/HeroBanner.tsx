import React from 'react';
import { Sparkles, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/20 p-8 sm:p-10 shadow-2xl">
      {/* Неоновое фоновое свечение */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>Платформа №1 для Remote & Web3 инженеров</span>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          Работа в лучших IT-компаниях мира <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            без привязки к офису
          </span>
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
          Отбираем проверенные удаленные вакансии с высокой оплатой в $ для Senior, Middle и Junior специалистов.
        </p>

        <div className="pt-2 flex items-center gap-4">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-6 py-3 rounded-2xl text-sm shadow-xl shadow-blue-600/25 transition-all active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>Найти вакансию</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};