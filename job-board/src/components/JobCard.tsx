import React from 'react';
import type { Job } from '../types/job';
import { MapPin, Briefcase, DollarSign, Bookmark, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface JobCardProps {
  job: Job;
  onClick: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent, jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick, isBookmarked, onToggleBookmark }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/50 rounded-2xl p-6 transition-all cursor-pointer shadow-lg hover:shadow-blue-500/5 relative group"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <img
            src={job.logo}
            alt={job.company}
            className="w-14 h-14 rounded-2xl object-cover border border-slate-700 bg-slate-900 shrink-0 group-hover:scale-105 transition-transform"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                {job.company}
              </span>
              {job.featured && (
                <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Top
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                {job.type} • {job.experience}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-700/50">
          <div className="text-left sm:text-right">
            <div className="text-sm font-bold text-slate-100 flex items-center sm:justify-end">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()} {job.currency}
            </div>
            <span className="text-xs text-slate-500">{job.postedAt}</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => onToggleBookmark(e, job.id)}
            className={`p-2.5 rounded-xl border transition-all ${
              isBookmarked
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="В избранное"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </motion.button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-slate-700/50">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs bg-slate-900/60 text-slate-300 px-3 py-1 rounded-lg border border-slate-700/60 hover:border-slate-500 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};