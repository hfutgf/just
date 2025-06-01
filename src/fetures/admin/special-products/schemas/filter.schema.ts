import { z } from 'zod';

export const filtersSchema = z
  .object({
    search: z.string().optional(),
    minPrice: z
      .string()
      .regex(/^\d*$/, { message: 'Faqat raqamlar' })
      .optional()
      .or(z.literal(''))
      .transform((val) => (val === '' ? undefined : val)),
    maxPrice: z
      .string()
      .regex(/^\d*$/, { message: 'Faqat raqamlar' })
      .optional()
      .or(z.literal(''))
      .transform((val) => (val === '' ? undefined : val)),
    page: z.number().min(1).default(1),
    pageSize: z.number().min(1).max(100).default(12),
    viewMode: z.enum(['grid', 'list']).default('grid'),
    sortOrder: z.string().default('newest').optional(),
  })
  .refine(
    (data) => {
      if (data.minPrice && data.maxPrice) {
        return Number(data.minPrice) <= Number(data.maxPrice);
      }
      return true;
    },
    {
      message: "Max narx min narxdan kam bo'lishi kerak emas",
      path: ['maxPrice'],
    }
  );

export type FiltersSchema = z.infer<typeof filtersSchema>;
