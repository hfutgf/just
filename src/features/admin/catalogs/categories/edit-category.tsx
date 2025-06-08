'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useEditCategory } from './hooks/use-edit-category';
import {
  updateCategoryFormSchema,
  UpdateCategoryFormValues,
} from './schemas/update-category.schema';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CategoryType } from '@/features/types/category.types';

const EditCategory = ({ category }: { category: CategoryType }) => {
  const router = useRouter();

  const form = useForm<UpdateCategoryFormValues>({
    resolver: zodResolver(updateCategoryFormSchema),
    defaultValues: {
      categoryName: category.categoryName ?? '',
      categoryName_ru: category.categoryName_ru ?? '',
      icon: category.icon ?? '',
    },
  });

  const { editCategory, isEditCategory, isSuccess, responseData } = useEditCategory();

  const onSubmit = (data: UpdateCategoryFormValues) => {
    editCategory({
      body: data,
      categoryId: category._id,
    });
    form.reset();
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/admin/catalogs/categories');
      toast.success(`Kategoriya muvaffaqiyatli o'zgartirildi`);
    } else if (!responseData?.success) {
      toast.error(responseData?.message);
    }
  }, [isSuccess, router, responseData]);

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Kategoriya o&apos;zgartirish</CardTitle>
          <CardDescription>
            Mahsulotlar uchun kategoriya o&apos;zgartirish uchun formani to‘ldiring.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="categoryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategoriya nomi </FormLabel>
                    <FormControl>
                      <Input placeholder="Elektronika" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryName_ru"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategoriya nomi (Ruscha)</FormLabel>
                    <FormControl>
                      <Input placeholder="Электроника" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon manzili (URL)</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Input placeholder={`<svg xmlns="http://www.w3.org/20...`} {...field} />
                        <div className="w-full flex items-center justify-end">
                          <div
                            className="bg-gray-100 px-2 py-1.5 rounded-lg"
                            dangerouslySetInnerHTML={{ __html: form.getValues('icon') ?? '' }}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex justify-end mt-6">
              <Button type="submit" disabled={isEditCategory}>
                {isEditCategory ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    O&apos;zgartirilmoqda...
                  </>
                ) : (
                  `Kategoriyani o'zgartirish`
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default EditCategory;
