import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useFetchCategories } from '../hooks/use-fetch-categories';
import { useUploadImages } from '../hooks/use-upload-image';
import {
  SpecialProductFormType,
  specialProductroductFormSchema,
} from '../schemas/special-product.schema';
import { uploadImagesSchema, UploadImagesSchema } from '../schemas/upload.schema';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { formatPrice } from '@/utils/format-price';

type Props = {
  createProduct: (body: SpecialProductFormType) => void;
  isCreateSpecialProduct?: boolean;
  isCreateSuccess?: boolean;
};

const CreateForm = ({ isCreateSpecialProduct, createProduct }: Props) => {
  const [activeTab, setActiveTab] = useState('images');

  const { categories, isFetchCategory } = useFetchCategories();
  const { isUploadImages, isUploadImagesSuccess, upload, uploadImagesData } = useUploadImages();

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

  const uploadForm = useForm<UploadImagesSchema>({
    resolver: zodResolver(uploadImagesSchema),
    defaultValues: {
      images: [],
    },
  });

  const watchCategory = form.watch('categoryId');
  const images = uploadForm.watch('images');

  const handleUpload = (data: UploadImagesSchema) => {
    const formData = new FormData();
    data.images.forEach((image) => {
      formData.append('images', image);
    });

    upload(formData);
  };

  useEffect(() => {
    if (isUploadImagesSuccess) {
      form.setValue('images', uploadImagesData?.data);
      setActiveTab('details');
    }
  }, [form, isUploadImagesSuccess, uploadImagesData?.data]);

  const onSubmit = (data: SpecialProductFormType) => {
    createProduct(data);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="images">Rasmlar</TabsTrigger>
          <TabsTrigger value="details" disabled={!images || images.length === 0}>
            Mahsulot ma&apos;lumotlari
          </TabsTrigger>
        </TabsList>

        <TabsContent value="images">
          <Form {...uploadForm}>
            <form onSubmit={uploadForm.handleSubmit(handleUpload)} className="space-y-6">
              <FormField
                control={uploadForm.control}
                name="images"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel>Mahsulot rasmlari</FormLabel>
                    <FormControl>
                      <InputPhotosUpload value={field.value || []} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={!images || images.length === 0 || isUploadImages}
                  className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
                >
                  Rasmlarni saqlash
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="details">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
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
                                ?.subCategories?.map((subcategory) => (
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
                          <Textarea
                            placeholder="Yetkazib berish haqida ma'lumot"
                            rows={3}
                            {...field}
                          />
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

                <div className="flex gap-4 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={() => setActiveTab('images')}>
                    Ortga
                  </Button>
                  <Button
                    disabled={isCreateSpecialProduct}
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
                  >
                    Mahsulotni yaratish
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateForm;
