import z from 'zod';

export const createBannerSchema = z.object({
  imageUrl: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: 'Rasm yuklash majburiy',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'Fayl hajmi 5MB dan oshmasligi kerak',
    }),
});

export type CreateBannerSchema = z.infer<typeof createBannerSchema>;
