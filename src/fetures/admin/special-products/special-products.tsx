'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, List, Plus } from 'lucide-react';
import React, { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';

import CategoryFilter from './components/category-filter';
import { GridView } from './components/grid-view';
import { ListView } from './components/list-view';
import Pagination from './components/pagination';
import ProductsFilter from './components/product-filter';
import { useFetchSpecialProducts } from './hooks/use-fetch-special-products';
import { filtersSchema, FiltersSchema } from './schemas/filter.schema';

import { Button } from '@/components/ui/button';
import InputSearch from '@/components/ui/input-search';
import { useDebounce } from '@/hooks/use-debounce';

const SpecialProducts = () => {
  const form = useForm<FiltersSchema>({
    resolver: zodResolver(filtersSchema) as Resolver<FiltersSchema>,
    defaultValues: {
      search: '',
      minPrice: '',
      maxPrice: '',
      page: 1,
      pageSize: 12,
      viewMode: 'grid',
    },
  });

  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const searchTerm = watch('search');
  const currentPage = watch('page');
  const minPrice = watch('minPrice');
  const maxPrice = watch('maxPrice');
  const pageSize = watch('pageSize');
  const viewMode = watch('viewMode');
  const sortOrder = watch('sortOrder');
  const categoryIds = watch('categoryIds');
  const subCategoryIds = watch('subCategoryIds');

  const debouncedSearch = useDebounce(searchTerm, 500);
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  const { isFetchProducts, products, refetchSpecialProducts } = useFetchSpecialProducts({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
    minPrice: debouncedMinPrice || undefined,
    maxPrice: debouncedMaxPrice || undefined,
    sortOrder,
    categoryIds,
    subCategoryIds,
  });

  useEffect(() => {
    refetchSpecialProducts();
  }, [
    currentPage,
    refetchSpecialProducts,
    debouncedSearch,
    debouncedMinPrice,
    debouncedMaxPrice,
    sortOrder,
    categoryIds,
    subCategoryIds,
  ]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setValue('page', currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < (products?.pagination?.totalPages ?? 1)) {
      setValue('page', currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    setValue('page', page);
  };

  const handleSearchChange = (value: string) => {
    setValue('search', value);
    setValue('page', 1);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setValue('viewMode', mode);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Maxsus mahsulotlar</h1>
          <p className="text-slate-600 mt-1">Chegirmali mahsulotlarni boshqarish</p>
        </div>
        <Button
          size={'lg'}
          variant={'outline'}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Mahsulot qo&apos;shish</span>
        </Button>
      </div>

      <div className="flex items-center justify-between bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center space-x-4">
          <InputSearch
            value={searchTerm || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <ProductsFilter form={form} />
          <CategoryFilter form={form} />
        </div>

        <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
          <Button
            size={'icon'}
            variant={'secondary'}
            onClick={() => handleViewModeChange('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={'secondary'}
            size={'icon'}
            onClick={() => handleViewModeChange('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium mb-2">Xatolar:</h3>
          <ul className="text-red-700 text-sm space-y-1">
            {Object.entries(errors).map(([key, error]) => (
              <li key={key}>• {error?.message}</li>
            ))}
          </ul>
        </div>
      )}

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
              onPageChange={handlePageChange}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
            />
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Jami mahsulotlar: {products.total}</span>
              <span>
                Ko&apos;rsatilgan:{' '}
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
