import { SubCategoryType } from './sub-cateogry.type';

export type CategoryType = {
  _id: string;
  categoryName: string;
  categoryName_ru: string;
  subCategories: SubCategoryType[];
  type: 'default';
  createdAt: string;
  updatedAt: string;
};

export type CategoryResponseType = {
  data: CategoryType[];
  success: boolean;
  message?: string;
};
