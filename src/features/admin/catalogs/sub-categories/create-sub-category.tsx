'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { useFetchCategories } from '../categories/hooks/use-fetch-categories';

import { useCreateSubCategory } from './hooks/use-create-sub-category';
import { createSubCategorySchema } from './schemas/create-sub-category.schema';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CreateSubCategory = () => {
  const router = useRouter();
  const { categories } = useFetchCategories();
  const { isCreatePending, isCreateSuccess, createSubCategory } = useCreateSubCategory();

  const form = useForm<z.infer<typeof createSubCategorySchema>>({
    resolver: zodResolver(createSubCategorySchema),
    defaultValues: {
      subCategoryName: '',
      subCategoryName_ru: '',
      categoryId: '',
    },
  });

  async function onSubmit(values: z.infer<typeof createSubCategorySchema>) {
    createSubCategory(values);
  }

  useEffect(() => {
    if (isCreateSuccess) {
      toast.success('Pastki kategoriya muvaffaqiyatli yaratildi');
      router.push('/admin/catalogs/categories');
    }
  }, [isCreateSuccess, router]);

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Yangi pastki kategoriya yaratish</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asosiy kategoriya</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Kategoriya tanlang" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.data.map((category) => (
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
                name="subCategoryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pastki kategoriya nomi (EN)</FormLabel>
                    <FormControl>
                      <Input placeholder="Pastki kategoriya nomini kiriting" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subCategoryName_ru"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pastki kategoriya nomi (RU)</FormLabel>
                    <FormControl>
                      <Input placeholder="Подкатегория номини киритинг" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/catalogs/subcategories')}
                >
                  Bekor qilish
                </Button>
                <Button type="submit" disabled={isCreatePending}>
                  {isCreatePending ? 'Yaratilmoqda...' : 'Pastki kategoriya yaratish'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSubCategory;
