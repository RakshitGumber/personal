type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between border-t border-line pt-4">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="border border-line px-3 py-2 text-sm disabled:opacity-40"
      >
        Previous
      </button>
      <p className="text-sm text-muted">
        Page {page} of {pageCount}
      </p>
      <button
        type="button"
        onClick={() => onPageChange(Math.min(pageCount, page + 1))}
        disabled={page >= pageCount}
        className="border border-line px-3 py-2 text-sm disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}
