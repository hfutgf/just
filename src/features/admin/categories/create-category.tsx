'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useCreateCategory } from './hooks/use-create-category';
import {
  createCategoryFormSchema,
  CreateCategoryFormValues,
} from './schemas/create-category.schema';

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

const CreateCategory = () => {
  const router = useRouter();

  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      categoryName: '',
      categoryName_ru: '',
      icon: '',
    },
  });

  const { createCategory, isCategoryCreate, isSuccess, responseData } = useCreateCategory();

  const onSubmit = (data: CreateCategoryFormValues) => {
    createCategory(data);
    form.reset();
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/admin/categories');
      toast.success('Kategoriya muvaffaqiyatli yaratildi');
    } else if (!responseData?.success) {
      toast.error(responseData?.message);
    }
  }, [isSuccess, router, responseData]);

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Yangi Kategoriya Yaratish</CardTitle>
          <CardDescription>
            Mahsulotlar uchun yangi kategoriya yaratish uchun formani to‘ldiring.
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
                      <Input placeholder={`<svg xmlns="http://www.w3.org/20...`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex justify-end mt-6">
              <Button type="submit" disabled={isCategoryCreate}>
                {isCategoryCreate ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Yaratilmoqda...
                  </>
                ) : (
                  'Kategoriya yaratish'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateCategory;
