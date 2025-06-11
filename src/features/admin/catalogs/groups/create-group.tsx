'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { useFetchCategories } from '../categories/hooks/use-fetch-categories';

import { useCreateGroup } from './hooks/use-create-group';
import { createGroupSchema } from './schemas/create-group.schema';

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

const CreateGroup = () => {
  const router = useRouter();
  const { categories } = useFetchCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const { createGroup, isCreatePending, isCreateSuccess } = useCreateGroup();

  const form = useForm<z.infer<typeof createGroupSchema>>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      group: '',
      group_ru: '',
      categoryId: '',
      subCategoryId: '',
    },
  });

  const handleCategoryChange = (value: string) => {
    setSelectedCategoryId(value);
    form.setValue('categoryId', value);
    form.setValue('subCategoryId', '');
  };

  async function onSubmit(values: z.infer<typeof createGroupSchema>) {
    createGroup(values);
  }

  useEffect(() => {
    if (isCreateSuccess) {
      router.push('/admin/catalogs/categories');
      toast.success('Guruh muvaffaqiyatli yaratildi!');
    }
  }, [isCreateSuccess, router]);

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Yangi guruh yaratish</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategoriya</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleCategoryChange(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Kategoriyani tanlang" />
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
                name="subCategoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pastki kategoriya</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!selectedCategoryId}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pastki kategoriyani tanlang" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedCategoryId &&
                          (
                            categories?.data.find((category) => category._id === selectedCategoryId)
                              ?.subCategories ?? []
                          ).map((subCategory) => (
                            <SelectItem key={subCategory._id} value={subCategory._id}>
                              {subCategory.subCategoryName}
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
                name="group"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guruh nomi (EN)</FormLabel>
                    <FormControl>
                      <Input placeholder="Guruh nomini kiriting" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="group_ru"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guruh nomi (RU)</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите название группы" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/catalogs/groups')}
                >
                  Bekor qilish
                </Button>
                <Button type="submit" disabled={isCreatePending}>
                  {isCreatePending ? 'Yaratilmoqda...' : 'Guruh yaratish'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateGroup;
