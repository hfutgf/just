'use client';

import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { CategoryResponseType } from '@/features/types/category.types';

type CategoriesPropsType = {
  categories: CategoryResponseType;
};

const Categories = ({ categories }: CategoriesPropsType) => {
  const [showAllButton, setShowAllButton] = useState(false);

  useEffect(() => {
    if (categories.data.length > 10) {
      setShowAllButton(true);
    }
  }, [categories]);

  if (!categories?.data || categories.data.length === 0) {
    return (
      <div className="mb-3 p-2 bg-gray-100 shadow-md rounded-full inline-flex">
        Kategoriyalar mavjud emas
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="flex items-center gap-4 flex-wrap">
        {categories.data.slice(0, 10).map((category) => (
          <Button
            key={category._id}
            variant="secondary"
            className="rounded-full whitespace-nowrap hover:bg-gray-200 flex-shrink-0"
          >
            {category.categoryName}
          </Button>
        ))}

        {showAllButton && (
          <Button variant="outline" className="rounded-full whitespace-nowrap flex-shrink-0">
            Hammasi
          </Button>
        )}
      </div>
    </div>
  );
};

export default Categories;
