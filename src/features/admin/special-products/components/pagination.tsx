import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  handlePrevPage,
  handleNextPage,
  isFetchProducts,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  isFetchProducts: boolean;
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-6 py-8">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevPage}
        disabled={currentPage === 1 || isFetchProducts}
        className="disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNum =
            totalPages <= 5
              ? i + 1
              : currentPage <= 3
                ? i + 1
                : currentPage >= totalPages - 2
                  ? totalPages - 4 + i
                  : currentPage - 2 + i;

          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(pageNum)}
              disabled={isFetchProducts}
              className={`min-w-[2.5rem] h-10 ${
                currentPage === pageNum
                  ? 'font-semibold bg-blue-600 hover:bg-blue-700'
                  : 'disabled:opacity-40'
              }`}
            >
              {isFetchProducts && currentPage === pageNum ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                pageNum
              )}
            </Button>
          );
        })}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span className="px-2 text-slate-400 select-none">⋯</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              disabled={isFetchProducts}
              className="min-w-[2.5rem] h-10 disabled:opacity-40"
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleNextPage}
        disabled={currentPage === totalPages || isFetchProducts}
        className="disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
