import z from 'zod';

export const updateCategoryFormSchema = z.object({
  categoryName: z
    .string()
    .min(2, {
      message: 'Kategoriya nomi kamida 2 ta belgidan iborat bo‘lishi kerak.',
    })
    .optional(),
  categoryName_ru: z
    .string()
    .min(2, {
      message: 'Kategoriya nomi (ruscha) kamida 2 ta belgidan iborat bo‘lishi kerak.',
    })
    .optional(),
  icon: z
    .string()
    .min(1, {
      message: 'Icon majburiy.',
    })
    .optional(),
  subCategories: z.array(z.string()).optional(),
});

export type UpdateCategoryFormValues = z.infer<typeof updateCategoryFormSchema>;
