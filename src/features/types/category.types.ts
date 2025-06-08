import { SubCategoryType } from './sub-cateogry.type';

export type CategoryType = {
  _id: string;
  categoryName: string;
  categoryName_ru: string;
  subCategories?: SubCategoryType[];
  icon: string;
  createdAt: string;
  updatedAt?: string;
};

export type CategoriesResponseType = {
  data: CategoryType[];
  success: boolean;
  message?: string;
};

export type CategoryFormType = {
  categoryName: string;
  categoryName_ru: string;
  subCategories?: string[];
  icon: string;
};

export type CategoryResponseType = {
  data: CategoryType;
  success: boolean;
  message?: string;
};
