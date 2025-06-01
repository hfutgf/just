import { ChevronDown, ListFilterPlus } from 'lucide-react';
import React from 'react';

import { useFetchCategories } from '../hooks/use-fetch-categories';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

const CategoryFilter = () => {
  const { categories, isFetchCategory } = useFetchCategories();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isFetchCategory} asChild>
        <Button size="lg" variant="outline" className="gap-2 ">
          <ListFilterPlus className="size-4 text-slate-500" />
          <span className="text-slate-700">Kategoriyalar</span>
          <ChevronDown className="w-4 h-4 ml-auto opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2" align="start">
        <ScrollArea className="h-64 pr-3">
          <div className="space-y-2">
            {categories?.success &&
              categories.data.map((category) => (
                <div key={category._id} className="space-y-1">
                  <div className="flex items-center space-x-2 p-2 hover:bg-accent rounded">
                    <Checkbox id={`cat-${category._id}`} />
                    <label htmlFor={`cat-${category._id}`} className="text-sm font-medium">
                      {category.categoryName}
                    </label>
                  </div>
                  <div className="ml-6 space-y-1">
                    {category.subCategories.map((subcategory) => (
                      <div
                        key={subcategory._id}
                        className="flex items-center space-x-2 p-2 hover:bg-accent rounded"
                      >
                        <Checkbox id={`sub-${category._id}-${subcategory._id}`} />
                        <label
                          htmlFor={`sub-${category._id}-${subcategory._id}`}
                          className="text-sm text-muted-foreground"
                        >
                          {subcategory.subCategoryName}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryFilter;
