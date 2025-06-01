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
        className="
          relative overflow-hidden
          hover:shadow-md hover:scale-105
          disabled:hover:scale-100 disabled:hover:shadow-none
          transition-all duration-300 ease-out
          border-slate-200 hover:border-slate-300
          text-slate-600 hover:text-slate-800
          bg-white/80 backdrop-blur-sm
          disabled:opacity-40
        "
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-slate-50/80 to-white/80 backdrop-blur-sm border border-slate-100 shadow-sm">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(pageNum)}
              disabled={isFetchProducts}
              className={`
                relative overflow-hidden min-w-[2.5rem] h-10
                transition-all duration-300 ease-out
                ${
                  currentPage === pageNum
                    ? `
                      bg-gradient-to-br from-blue-500 to-blue-600 
                      text-white border-blue-500
                      shadow-lg shadow-blue-500/25
                      hover:shadow-xl hover:shadow-blue-500/30
                      hover:scale-105
                      before:absolute before:inset-0 
                      before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
                      before:translate-x-[-100%] hover:before:translate-x-[100%]
                      before:transition-transform before:duration-700
                    `
                    : `
                      border-slate-200 hover:border-slate-300
                      text-slate-600 hover:text-slate-800
                      bg-white/60 hover:bg-white/90
                      hover:shadow-md hover:scale-105
                      disabled:hover:scale-100 disabled:hover:shadow-none
                    `
                }
                disabled:opacity-40
                font-medium
              `}
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
            <span className="px-3 py-2 text-slate-400 font-medium select-none">⋯</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              disabled={isFetchProducts}
              className="
                relative overflow-hidden min-w-[2.5rem] h-10
                border-slate-200 hover:border-slate-300
                text-slate-600 hover:text-slate-800
                bg-white/60 hover:bg-white/90
                hover:shadow-md hover:scale-105
                disabled:hover:scale-100 disabled:hover:shadow-none
                transition-all duration-300 ease-out
                disabled:opacity-40
                font-medium
              "
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
        className="
          relative overflow-hidden
          hover:shadow-md hover:scale-105
          disabled:hover:scale-100 disabled:hover:shadow-none
          transition-all duration-300 ease-out
          border-slate-200 hover:border-slate-300
          text-slate-600 hover:text-slate-800
          bg-white/80 backdrop-blur-sm
          disabled:opacity-40
        "
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
