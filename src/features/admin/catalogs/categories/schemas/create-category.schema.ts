import z from 'zod';

export const createCategoryFormSchema = z.object({
  categoryName: z.string().min(2, {
    message: 'Kategoriya nomi kamida 2 ta belgidan iborat bo‘lishi kerak.',
  }),
  categoryName_ru: z.string().min(2, {
    message: 'Kategoriya nomi (ruscha) kamida 2 ta belgidan iborat bo‘lishi kerak.',
  }),
  icon: z.string().min(1, {
    message: 'Icon majburiy.',
  }),
  subCategories: z.array(z.string()).optional(),
});

export type CreateCategoryFormValues = z.infer<typeof createCategoryFormSchema>;
