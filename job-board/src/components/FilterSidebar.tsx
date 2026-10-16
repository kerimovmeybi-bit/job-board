import React from 'react';
import  type { JobFilterState, JobType, ExperienceLevel } from '../types/job';
import  { Search, MapPin, DollarSign, RotateCcw, Filter } from 'lucide-react';

interface FilterSidebarProps {
  filters: JobFilterState;
  onFilterChange: (newFilters: JobFilterState) => void;
  onReset: () => void;
  allSkills: string[];
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  allSkills
}) => {
  const handleTypeChange = (type: JobType | 'All') => {
    onFilterChange({ ...filters, type });
  };

  const handleExpChange = (experience: ExperienceLevel | 'All') => {
    onFilterChange({ ...filters, experience });
  };

  const toggleSkill = (skill: string) => {
    const selected = filters.selectedSkills.includes(skill)
      ? filters.selectedSkills.filter(s => s !== skill)
      : [...filters.selectedSkills, skill];
    onFilterChange({ ...filters, selectedSkills: selected });
  };

  return (
    <aside className="bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm rounded-2xl p-5 space-y-6 sticky top-24">
      <div className="flex items-center justify-between pb-4 border-b border-slate-700">
        <div className="flex items-center gap-2 text-slate-100 font-semibold">
          <Filter className="w-5 h-5 text-blue-400" />
          <span>Фильтры</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Сбросить</span>
        </button>
      </div>

      {/* Поиск по названию */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Поиск должности</label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="React, Frontend..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Формат работы */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Тип занятости</label>
        <div className="flex flex-wrap gap-2">
          {(['All', 'Full-time', 'Part-time', 'Contract', 'Remote'] as const).map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filters.type === type
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              {type === 'All' ? 'Все' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Уровень опыта */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Опыт работы</label>
        <div className="grid grid-cols-2 gap-2">
          {(['All', 'Junior', 'Middle', 'Senior', 'Lead'] as const).map((exp) => (
            <button
              key={exp}
              onClick={() => handleExpChange(exp)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-center ${
                filters.experience === exp
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              {exp === 'All' ? 'Все уровни' : exp}
            </button>
          ))}
        </div>
      </div>

      {/* Минимальная зарплата */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="font-semibold text-slate-300 uppercase tracking-wider">Мин. Зарплата</span>
          <span className="text-blue-400 font-semibold">${filters.minSalary}</span>
        </div>
        <input
          type="range"
          min="0"
          max="8000"
          step="500"
          value={filters.minSalary}
          onChange={(e) => onFilterChange({ ...filters, minSalary: Number(e.target.value) })}
          className="w-full accent-blue-500 cursor-pointer"
        />
      </div>

      {/* Навыки / Стек */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Технологии</label>
        <div className="flex flex-wrap gap-1.5">
          {allSkills.map((skill) => {
            const isSelected = filters.selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                    : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-slate-700/30'
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};