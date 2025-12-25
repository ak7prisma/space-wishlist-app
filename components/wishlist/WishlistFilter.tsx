import { Search, X } from 'lucide-react';

interface WishlistFilterProps {
  search: string;
  setSearch: (value: string) => void;
  total: number;
}

export function WishlistFilter({ search, setSearch, total }: Readonly<WishlistFilterProps>) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 w-full">
      
      {/* Title */}
      <div className="w-full md:w-auto">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          Star Archive
        </h3>
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-slate-400 border border-white/5">
            {total} Signals
          </span>
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-96 group">
        {/* Icon Search */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors pointer-events-none z-10">
          <Search size={18} />
        </div>

        <input
          type="text"
          placeholder="Search frequency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900/50 border border-white/10 rounded-full py-2.5 pl-10 pr-10 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-sm"
        />

        {/* Button Clear */}
        {search.length > 0 && (
          <button 
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors z-20 p-1 bg-slate-800/50 rounded-full"
          >
              <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}