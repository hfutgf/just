import z from 'zod';

export const uploadImagesSchema = z.object({
  images: z.custom<File[]>((val) => val instanceof Array && val.length > 0, {
    message: 'Kamida 1 ta rasm yuklashingiz kerak',
  }),
});

export type UploadImagesSchema = z.infer<typeof uploadImagesSchema>;
