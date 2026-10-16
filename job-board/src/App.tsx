import { useState, useMemo, useEffect } from 'react';
import { MOCK_JOBS } from './data/jobs';
import type { Job, JobFilterState } from './types/job';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterSidebar } from './components/FilterSidebar';
import { JobCard } from './components/JobCard';
import { JobModal } from './components/JobModal';
import { CreateJobModal } from './components/CreateJobModal';
import { Toast } from './components/Toast';
import { JobSkeleton } from './components/JobSkeleton';
import { Pagination } from './components/Pagination';
import { Briefcase, TrendingUp, DollarSign, ArrowUpDown, Download, Filter, X, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS_PER_PAGE = 4;
const POPULAR_TAGS = ['React', 'TypeScript', 'Node.js', 'Tailwind', 'Senior', 'Full-time'];

export function App() {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('devjobs_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'salary-high'>('newest');

  const [filters, setFilters] = useState<JobFilterState>({
    search: '',
    location: '',
    type: 'All',
    experience: 'All',
    minSalary: 0,
    selectedSkills: []
  });

  useEffect(() => {
    localStorage.setItem('devjobs_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, showBookmarksOnly, sortBy]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleBookmark = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const isFav = prev.includes(jobId);
      if (isFav) {
        showToast('Вакансия удалена из избранного');
        return prev.filter(id => id !== jobId);
      } else {
        showToast('Вакансия добавлена в избранное!');
        return [...prev, jobId];
      }
    });
  };

  const handleQuickTagClick = (tag: string) => {
    if (tag === 'Senior') {
      setFilters(prev => ({ ...prev, experience: prev.experience === 'Senior' ? 'All' : 'Senior' }));
    } else if (tag === 'Full-time') {
      setFilters(prev => ({ ...prev, type: prev.type === 'Full-time' ? 'All' : 'Full-time' }));
    } else {
      setFilters(prev => {
        const exists = prev.selectedSkills.includes(tag);
        return {
          ...prev,
          selectedSkills: exists
            ? prev.selectedSkills.filter(s => s !== tag)
            : [...prev.selectedSkills, tag]
        };
      });
    }
  };

  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    jobs.forEach(j => j.skills.forEach(s => skillsSet.add(s)));
    return Array.from(skillsSet);
  }, [jobs]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      location: '',
      type: 'All',
      experience: 'All',
      minSalary: 0,
      selectedSkills: []
    });
    setShowBookmarksOnly(false);
  };

  const handleAddJob = (newJob: Job) => {
    setJobs(prev => [newJob, ...prev]);
    showToast('Вакансия успешно опубликована!');
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      if (showBookmarksOnly && !bookmarkedIds.includes(job.id)) return false;

      const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                            job.company.toLowerCase().includes(filters.search.toLowerCase());

      const matchesType = filters.type === 'All' || job.type === filters.type;
      const matchesExperience = filters.experience === 'All' || job.experience === filters.experience;
      const matchesSalary = job.salaryMax >= filters.minSalary;

      const matchesSkills = filters.selectedSkills.length === 0 ||
        filters.selectedSkills.every(skill => job.skills.includes(skill));

      return matchesSearch && matchesType && matchesExperience && matchesSalary && matchesSkills;
    }).sort((a, b) => {
      if (sortBy === 'salary-high') {
        return b.salaryMax - a.salaryMax;
      }
      return 0;
    });
  }, [jobs, filters, showBookmarksOnly, bookmarkedIds, sortBy]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const avgSalary = useMemo(() => {
    if (filteredJobs.length === 0) return 0;
    const total = filteredJobs.reduce((acc, job) => acc + (job.salaryMin + job.salaryMax) / 2, 0);
    return Math.round(total / filteredJobs.length);
  }, [filteredJobs]);

  const handleExportCSV = () => {
    if (filteredJobs.length === 0) return;
    
    const headers = ['ID', 'Title', 'Company', 'Location', 'Type', 'Experience', 'Min Salary', 'Max Salary', 'Skills'];
    const rows = filteredJobs.map(j => [
      j.id,
      `"${j.title}"`,
      `"${j.company}"`,
      `"${j.location}"`,
      j.type,
      j.experience,
      j.salaryMin,
      j.salaryMax,
      `"${j.skills.join(', ')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `devjobs_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Список вакансий выгружен в CSV!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden font-sans">
      {/* Декоративные фоновые эффекты свечения */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar
        onOpenCreateModal={() => setIsCreateOpen(true)}
        jobCount={jobs.length}
        showBookmarksOnly={showBookmarksOnly}
        onToggleBookmarksFilter={() => setShowBookmarksOnly(!showBookmarksOnly)}
        bookmarksCount={bookmarkedIds.length}
      />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex-1 w-full space-y-8 relative z-10">
        <HeroBanner onExploreClick={() => window.scrollTo({ top: 450, behavior: 'smooth' })} />

        {/* Быстрые теги поиска */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 shrink-0">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Быстрый фильтр:
          </span>
          {POPULAR_TAGS.map(tag => {
            const isActive = filters.selectedSkills.includes(tag) || filters.experience === tag || filters.type === tag;
            return (
              <button
                key={tag}
                onClick={() => handleQuickTagClick(tag)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all shrink-0 font-medium ${
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Дашборд со статистикой */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4 shadow-xl">
            <div className="bg-blue-600/20 p-3 rounded-xl border border-blue-500/30 text-blue-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Найдено вакансий</p>
              <h4 className="text-xl font-bold text-slate-100">{filteredJobs.length}</h4>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4 shadow-xl">
            <div className="bg-emerald-600/20 p-3 rounded-xl border border-emerald-500/30 text-emerald-400">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Средняя зарплата</p>
              <h4 className="text-xl font-bold text-slate-100">${avgSalary.toLocaleString()} / мес</h4>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4 shadow-xl">
            <div className="bg-amber-600/20 p-3 rounded-xl border border-amber-500/30 text-amber-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Remote формат</p>
              <h4 className="text-xl font-bold text-slate-100">100% Удаленно</h4>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Десктопные фильтры */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              allSkills={allSkills}
            />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl px-5 py-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
              <span className="text-sm text-slate-300 font-medium">
                {showBookmarksOnly ? 'Показаны избранные вакансии' : 'Все доступные позиции'}
              </span>

              <div className="flex items-center gap-3">
                {/* Кнопка открытия фильтров на мобильных устройствах */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300"
                >
                  <Filter className="w-3.5 h-3.5 text-blue-400" />
                  <span>Фильтры</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors"
                  title="Скачать отфильтрованный список в CSV"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline">Экспорт CSV</span>
                </button>

                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'salary-high')}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="newest">Сначала новые</option>
                    <option value="salary-high">По высокой ЗП</option>
                  </select>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <JobSkeleton />
                <JobSkeleton />
                <JobSkeleton />
              </div>
            ) : (
              <>
                <AnimatePresence mode="popLayout">
                  {paginatedJobs.length > 0 ? (
                    paginatedJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onClick={() => setSelectedJob(job)}
                        isBookmarked={bookmarkedIds.includes(job.id)}
                        onToggleBookmark={handleToggleBookmark}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-12 text-center space-y-4"
                    >
                      <Briefcase className="w-12 h-12 text-slate-500 mx-auto" />
                      <h3 className="text-lg font-bold text-slate-300">Вакансий не найдено</h3>
                      <p className="text-sm text-slate-500 max-w-sm mx-auto">
                        {showBookmarksOnly ? 'У вас пока нет сохраненных вакансий.' : 'Попробуйте изменить параметры поиска.'}
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-xl text-sm transition-colors"
                      >
                        Сбросить все фильтры
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </main>

      {/* Мобильная шторка фильтров */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="w-full max-w-xs bg-slate-900 h-full p-6 overflow-y-auto border-l border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="font-bold text-slate-200">Фильтры</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
                allSkills={allSkills}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <JobModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onShare={(title) => showToast(`Ссылка на "${title}" скопирована!`)}
      />
      <CreateJobModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onAddJob={handleAddJob}
      />
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default App;