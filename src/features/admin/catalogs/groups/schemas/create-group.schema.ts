import z from 'zod';

export const createGroupSchema = z.object({
  group: z.string().min(2, {
    message: 'Group name must be at least 2 characters.',
  }),
  group_ru: z.string().min(2, {
    message: 'Название группы должно содержать не менее 2 символов.',
  }),
  categoryId: z.string().min(1, {
    message: 'Please select a category',
  }),
  subCategoryId: z.string().min(1, {
    message: 'Please select a subcategory',
  }),
});
