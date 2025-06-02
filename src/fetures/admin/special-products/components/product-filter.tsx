import { ArrowUpDown, Calendar, CircleDollarSign, Filter, X } from 'lucide-react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FiltersSchema } from '../schemas/filter.schema';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/utils/format-price';

type Props = {
  form: UseFormReturn<FiltersSchema>;
};

function ProductsFilter({ form }: Props) {
  const {
    formState: { errors },
    watch,
  } = form;

  const minPrice = watch('minPrice');
  const maxPrice = watch('maxPrice');
  const hasActiveFilters = minPrice || maxPrice;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2 relative">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-slate-700">Filtrlar</span>
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-4 space-y-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <Label className="text-sm font-medium text-slate-700">
              Sana bo&apos;yicha tartiblash
            </Label>
          </div>
          <Select
            onValueChange={(value) => form.setValue('sortOrder', value)}
            value={watch('sortOrder')}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tartib tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem disabled value="default">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-slate-400" />
                  <span>Standart</span>
                </div>
              </SelectItem>
              <SelectItem value="desc">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span>Yangi mahsulotlar</span>
                </div>
              </SelectItem>
              <SelectItem value="asc">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span>Eski mahsulotlar</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <CircleDollarSign className="text-slate-500" />
            </div>
            <Label className="text-sm font-medium text-slate-700">Narx oralig&lsquo;i</Label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="minPrice" className="text-xs text-slate-600">
                Min narx
              </Label>
              <Input
                id="minPrice"
                placeholder="0"
                type="text"
                inputMode="numeric"
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, '');
                  form.setValue('minPrice', digitsOnly);
                }}
                value={formatPrice(watch('minPrice') || '')}
                className={`h-10 ${errors.minPrice ? 'border-red-500' : ''}`}
              />
              {errors.minPrice && <p className="text-xs text-red-500">{errors.minPrice.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPrice" className="text-xs text-slate-600">
                Max narx
              </Label>
              <Input
                id="maxPrice"
                placeholder="∞"
                type="text"
                inputMode="numeric"
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, '');
                  form.setValue('maxPrice', digitsOnly);
                }}
                value={formatPrice(watch('maxPrice') || '')}
                className={`h-10 ${errors.maxPrice ? 'border-red-500' : ''}`}
              />
              {errors.maxPrice && <p className="text-xs text-red-500">{errors.maxPrice.message}</p>}
            </div>
          </div>
        </div>

        <Separator />
        <Button
          variant="ghost"
          className="
    w-full justify-start gap-3 
    text-red-500 hover:text-red-600 
    hover:bg-red-50 
    border border-transparent hover:border-red-200
    rounded-lg h-10 px-4
    transition-colors duration-200
    font-medium
  "
          onClick={() => {
            form.resetField('minPrice');
            form.resetField('maxPrice');
            form.resetField('sortOrder');
          }}
        >
          <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
          <span>Filtrlarni tozalash</span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProductsFilter;
