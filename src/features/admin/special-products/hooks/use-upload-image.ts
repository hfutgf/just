import { useMutation } from '@tanstack/react-query';

import { ResponseUploadImageType } from '../types';

import { axiosAdminApi } from '@/api/interceptors';

export function useUploadImages() {
  const {
    mutate: upload,
    isPending: isUploadImages,
    isSuccess: isUploadImagesSuccess,
    data: uploadImagesData,
  } = useMutation({
    mutationKey: ['special-product-create'],
    mutationFn: async (body: FormData) => {
      const response = await axiosAdminApi.post<ResponseUploadImageType>(
        '/specialproducts/upload-images',
        body,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    },
  });

  return {
    upload,
    isUploadImages,
    isUploadImagesSuccess,
    uploadImagesData,
  };
}
