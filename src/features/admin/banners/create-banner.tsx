'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useCreateBanner } from './hooks/use-create-banner';
import { CreateBannerSchema, createBannerSchema } from './schemas/create-banner.schema';

import { Button } from '@/components/ui/button';
import InputPhotoUpload from '@/components/ui/input-photo-upload';

const CreateBanner = () => {
  const router = useRouter();
  const { createBanner, isCreateBanner, isCreateBannerSuccess } = useCreateBanner();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBannerSchema>({
    resolver: zodResolver(createBannerSchema),
    defaultValues: {
      imageUrl: undefined,
    },
  });

  const onSubmit = (data: CreateBannerSchema) => {
    const formData = new FormData();
    formData.append('image', data.imageUrl);
    createBanner(formData);
  };

  if (isCreateBannerSuccess) {
    router.push('/admin/banners');
    toast.success('Banner muvaffaqiyatli yaratildi');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="imageUrl"
        control={control}
        render={({ field }) => (
          <div>
            <InputPhotoUpload value={field.value} onChange={field.onChange} maxSizeMB={5} />
            {errors.imageUrl && (
              <p className="text-sm text-red-500 mt-1">{errors.imageUrl.message}</p>
            )}
          </div>
        )}
      />

      <div className="flex items-center justify-end">
        <Button
          size="lg"
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isCreateBanner}
        >
          Banner yaratish
        </Button>
      </div>
    </form>
  );
};

export default CreateBanner;
