import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useFetchCategories } from '../hooks/use-fetch-categories';
import {
  SpecialProductFormType,
  specialProductroductFormSchema,
} from '../schemas/special-product.schema';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import InputPhotosUpload from '@/components/ui/input-photos-upload';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { formatPrice } from '@/utils/format-price';

type Props = {
  createProduct: (body: FormData) => void;
  isCreateSpecialProduct?: boolean;
  isCreateSuccess?: boolean;
};

const SpecialProductForm = ({ isCreateSpecialProduct, createProduct }: Props) => {
  const { categories, isFetchCategory } = useFetchCategories();

  const form = useForm<SpecialProductFormType>({
    resolver: zodResolver(specialProductroductFormSchema),
    defaultValues: {
      name: '',
      name_ru: '',
      description: '',
      description_ru: '',
      price: 0,
      categoryId: '',
      subCategoryId: '',
      deliveryInfo: '',
      deliveryInfo_ru: '',
      images: [],
    },
  });

  const watchCategory = form.watch('categoryId');

  const onSubmit = (data: SpecialProductFormType) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('name_ru', data.name_ru);
    if (data.description) {
      formData.append('description', data.description);
    }
    if (data.description_ru) {
      formData.append('description_ru', data.description_ru);
    }
    formData.append('price', String(data.price));
    formData.append('categoryId', data.categoryId);
    formData.append('subCategoryId', data.subCategoryId);

    if (data.deliveryInfo) {
      formData.append('deliveryInfo', data.deliveryInfo);
    }
    if (data.deliveryInfo_ru) {
      formData.append('deliveryInfo_ru', data.deliveryInfo_ru);
    }
    data.images.forEach((file) => {
      formData.append('images', file);
    });
    createProduct(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Mahsulot nomi (UZ)</FormLabel>
                <FormControl>
                  <Input placeholder="Mahsulot nomini kiriting" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name_ru"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Mahsulot nomi (RU)</FormLabel>
                <FormControl>
                  <Input placeholder="Название продукта" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Tavsif (UZ)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Mahsulot tavsifini kiriting" rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description_ru"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Tavsif (RU)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Описание продукта" rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Narx</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1 000 000"
                    type="text"
                    inputMode="numeric"
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, '');
                      field.onChange(Number(digitsOnly));
                    }}
                    value={formatPrice(form.watch('price').toString() || '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Kategoriya</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isFetchCategory}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategoriyani tanlang" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.success &&
                      categories?.data.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.categoryName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subCategoryId"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Subkategoriya</FormLabel>
                <Select
                  disabled={!isFetchCategory && form.getValues('categoryId') ? false : true}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Subkategoriyani tanlang" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {watchCategory &&
                      categories?.data
                        .find((category) => category._id === watchCategory)
                        ?.subCategories.map((subcategory) => (
                          <SelectItem key={subcategory._id} value={subcategory._id}>
                            {subcategory.subCategoryName}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="deliveryInfo"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Yetkazib berish ma&apos;lumoti (UZ)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Yetkazib berish haqida ma'lumot" rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryInfo_ru"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Yetkazib berish ma&apos;lumoti (RU)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Информация о доставке" rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>Rasmlar</FormLabel>
              <FormControl>
                <InputPhotosUpload value={field.value || []} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 pt-6 border-t">
          <Button
            disabled={isCreateSpecialProduct}
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
          >
            Mahsulotni yaratish
          </Button>
          <Button type="button" variant="outline">
            Bekor qilish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SpecialProductForm;
