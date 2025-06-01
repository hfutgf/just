'use client';

import { Grid, List, Plus, Filter } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { GridView } from './components/grid-view';
import { ListView } from './components/list-view';
import Pagination from './components/pagination';
import { useFetchSpecialProducts } from './hooks/use-fetch-special-products';

import InputSearch from '@/components/ui/input-search';
import { useDebounce } from '@/hooks/use-debounce';

const SpecialProducts = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { isFetchProducts, products, refetchSpecialProducts } = useFetchSpecialProducts({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
  });

  useEffect(() => {
    refetchSpecialProducts();
  }, [currentPage, refetchSpecialProducts, debouncedSearch]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < (products?.pagination?.totalPages ?? 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Maxsus mahsulotlar</h1>
          <p className="text-slate-600 mt-1">Chegirmali mahsulotlarni boshqarish</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Mahsulot qo‘shish</span>
        </button>
      </div>

      <div className="flex items-center justify-between bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center space-x-4">
          <InputSearch value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button className="flex items-center space-x-2 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4テキスト - slate-500" />
            <span className="text-slate-700">Filtrlar</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {products?.success && products?.data && (
        <>
          <div className="space-y-6">
            {viewMode === 'grid' ? (
              <GridView isFetchProducts={isFetchProducts} products={products.data} />
            ) : (
              <ListView isFetchProducts={isFetchProducts} products={products.data} />
            )}
            <Pagination
              isFetchProducts={isFetchProducts}
              currentPage={currentPage}
              totalPages={products?.pagination?.totalPages || 1}
              onPageChange={setCurrentPage}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
            />
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Jami mahsulotlar: {products.total}</span>
              <span>
                Ko‘rsatilgan:{' '}
                {currentPage * pageSize < (products?.total ?? 0)
                  ? currentPage * pageSize
                  : products.total}
                / {products.total}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SpecialProducts;
