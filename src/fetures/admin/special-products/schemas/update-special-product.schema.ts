import z from 'zod';

export const updateSpecialProductroductFormSchema = z.object({
  name: z.string().min(3, "Nom kamida 3 ta belgidan iborat bo'lishi kerak"),
  name_ru: z.string().min(3, 'Название должно содержать минимум 3 символа'),
  description: z.string().optional(),
  description_ru: z.string().optional(),
  price: z.number().min(0, "Narx manfiy bo'lishi mumkin emas"),
  categoryId: z.string().min(1, 'Kategoriyani tanlang'),
  subCategoryId: z.string().min(1, 'Subkategoriyani tanlang'),
  deliveryInfo: z.string().optional(),
  deliveryInfo_ru: z.string().optional(),
  images: z.array(z.string()).optional(),
  deleteImages: z.array(z.string()).optional(),
});

export type UpdateSpecialProductFormType = z.infer<typeof updateSpecialProductroductFormSchema>;
