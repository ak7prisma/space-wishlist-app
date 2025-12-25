interface WishlistEmptyStateProps {
  hasSearch: boolean;
  onClear: () => void;
}

export function WishlistEmpty({ hasSearch, onClear }: Readonly<WishlistEmptyStateProps>) {
  return (
    <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
      <p className="text-slate-400">No signals found...</p>
      {hasSearch && (
        <button onClick={onClear} className="mt-2 text-cyan-400 hover:text-cyan-600 transition-colors">
          Clear Search
        </button>
      )}
    </div>
  );
}