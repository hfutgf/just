import * as z from 'zod';

export const createSubCategorySchema = z.object({
  subCategoryName: z.string().min(2, {
    message: 'Subcategory name must be at least 2 characters.',
  }),
  subCategoryName_ru: z.string().min(2, {
    message: 'Название подкатегории должно содержать не менее 2 символов.',
  }),
  categoryId: z.string().min(1, {
    message: 'Please select a category',
  }),
});
