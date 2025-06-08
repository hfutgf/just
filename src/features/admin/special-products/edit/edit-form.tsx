import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useFetchCategories } from '../../catalogs/categories/hooks/use-fetch-categories';
import { useFetchSpecialProduct } from '../hooks/use-fetch-special-product';
import { useUploadImages } from '../hooks/use-upload-image';
import { SpecialProductFormType } from '../schemas/special-product.schema';
import {
  UpdateSpecialProductFormType,
  updateSpecialProductroductFormSchema,
} from '../schemas/update-special-product.schema';
import { uploadImagesSchema, UploadImagesSchema } from '../schemas/upload.schema';

import Loading from '@/components/shared/loading';
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
  updateProduct: (body: Partial<SpecialProductFormType>) => void;
  isUpdateSpecialProduct?: boolean;
  specialProductId: string;
};

const EditForm = ({ isUpdateSpecialProduct, updateProduct, specialProductId }: Props) => {
  const [activeTab, setActiveTab] = useState('images');
  const [initialImages, setInitialImages] = useState<string[]>([]);

  const { categories, isFetchCategory } = useFetchCategories();
  const { isFetchProduct, specialProduct } = useFetchSpecialProduct(specialProductId);
  const { isUploadImages, upload, uploadImagesData, isUploadImagesSuccess } = useUploadImages();

  const form = useForm<UpdateSpecialProductFormType>({
    resolver: zodResolver(updateSpecialProductroductFormSchema),
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
      deleteImages: [],
    },
  });

  const uploadForm = useForm<UploadImagesSchema>({
    resolver: zodResolver(uploadImagesSchema),
    defaultValues: {
      images: [],
    },
  });

  const watchCategory = form.watch('categoryId');
  const newImages = uploadForm.watch('images');
  const currentImages = form.watch('images') || [];

  const handleUpload = async (data: UploadImagesSchema) => {
    const formData = new FormData();
    data.images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      upload(formData);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  useEffect(() => {
    if (uploadImagesData?.success) {
      form.setValue('images', [...currentImages, ...(uploadImagesData?.data ?? [])]);
      uploadForm.reset({ images: [] });
      setActiveTab('details');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUploadImagesSuccess]);

  const handleDeleteImage = (imageUrl: string) => {
    if (initialImages.includes(imageUrl)) {
      form.setValue('deleteImages', [...(form.getValues('deleteImages') || []), imageUrl]);
    }

    form.setValue(
      'images',
      currentImages.filter((img) => img !== imageUrl)
    );
  };

  useEffect(() => {
    if (specialProduct?.success && specialProduct.data) {
      const product = specialProduct.data;
      setInitialImages(product.images || []);

      form.reset({
        name: product.name || '',
        name_ru: product.name_ru || '',
        description: product.description || '',
        description_ru: product.description_ru || '',
        price: product.price || 0,
        categoryId: product.categoryId._id || '',
        subCategoryId: product.subCategoryId._id || '',
        deliveryInfo: product.deliveryInfo || '',
        deliveryInfo_ru: product.deliveryInfo_ru || '',
        images: product.images || [],
        deleteImages: [],
      });
    }
  }, [form, specialProduct]);

  const onSubmit = (data: UpdateSpecialProductFormType) => {
    updateProduct(data);
  };

  return (
    <section className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="images">Rasmlar</TabsTrigger>
          <TabsTrigger value="details">Mahsulot ma&apos;lumotlari</TabsTrigger>
        </TabsList>
        {(isFetchProduct || isFetchCategory) && <Loading />}
        {!isFetchCategory && !isFetchProduct && (
          <>
            <TabsContent value="images">
              <Form {...uploadForm}>
                <form onSubmit={uploadForm.handleSubmit(handleUpload)} className="space-y-6">
                  <FormField
                    control={uploadForm.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel>Yangi rasmlar qo&apos;shish</FormLabel>
                        <FormControl>
                          <InputPhotosUpload value={field.value || []} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {currentImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Product ${index}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteImage(image)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={() => setActiveTab('details')}>
                      Ortga
                    </Button>
                    <Button
                      type="submit"
                      disabled={!newImages || newImages.length === 0 || isUploadImages}
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
                              <Textarea
                                placeholder="Mahsulot tavsifini kiriting"
                                rows={4}
                                {...field}
                              />
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
                                value={formatPrice(form.watch('price')?.toString() || '0')}
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
                              value={field.value || ''}
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
                              onValueChange={field.onChange}
                              value={field.value || ''}
                              disabled={
                                !isFetchCategory && form.getValues('categoryId') ? false : true
                              }
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
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveTab('images')}
                      >
                        Ortga
                      </Button>
                      <Button
                        disabled={isUpdateSpecialProduct}
                        type="submit"
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
                      >
                        Mahsulotni o&apos;zgartirish
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </TabsContent>
          </>
        )}
      </Tabs>
    </section>
  );
};

export default EditForm;
