import React, { useState } from 'react';
import type { Job } from '../types/job';
import { X, MapPin, Briefcase, DollarSign, Building2, Upload, Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface JobModalProps {
  job: Job | null;
  onClose: () => void;
  onShare: (jobTitle: string) => void;
}

export const JobModal: React.FC<JobModalProps> = ({ job, onClose, onShare }) => {
  const [applied, setApplied] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!job) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      onClose();
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleShareClick = () => {
    const shareUrl = `${window.location.origin}/?job=${job.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    onShare(job.title);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-slate-800 border border-slate-700/80 rounded-2xl p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        >
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShareClick}
              className="p-2 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-900 rounded-full transition-colors flex items-center gap-1.5 text-xs px-3"
              title="Поделиться вакансией"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Скопировано!' : 'Поделиться'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-900 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <img
              src={job.logo}
              alt={job.company}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-700 bg-slate-900 shrink-0"
            />
            <div className="space-y-1 pr-20">
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                {job.company}
              </span>
              <h2 className="text-xl font-bold text-slate-100">{job.title}</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
            <div>
              <span className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Локация</span>
              <p className="text-sm font-semibold text-slate-200 mt-1">{job.location}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> Опыт</span>
              <p className="text-sm font-semibold text-slate-200 mt-1">{job.experience}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> Зарплата</span>
              <p className="text-sm font-semibold text-emerald-400 mt-1">${job.salaryMin.toLocaleString()} -${job.salaryMax.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Требуемые навыки</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span key={skill} className="text-xs bg-slate-900 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
                  {skill}
                </span>
              ))}
            </div>

            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider pt-2">Описание роли</h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/30 p-4 rounded-xl border border-slate-700/30">
              {job.description}
            </p>
          </div>

          {applied ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-center font-medium text-sm">
              🎉 Ваш отклик успешно отправлен работодателю!
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4 pt-4 border-t border-slate-700/60">
              <h3 className="text-sm font-bold text-slate-200">Откликнуться на вакансию</h3>
              
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-700 border-dashed rounded-xl cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-3 pb-3">
                    <Upload className="w-6 h-6 text-slate-400 mb-1" />
                    <p className="text-xs text-slate-400">
                      {fileName ? <span className="text-blue-400 font-medium">{fileName}</span> : 'Загрузите резюме (PDF / DOCX)'}
                    </p>
                  </div>
                  <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileChange} />
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 text-sm"
              >
                Отправить отклик
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};