import { CategoryType } from '../../catalogs/types/category.types';
import { SubCategoryType, PaginationOptionsType } from '../../catalogs/types/sub-cateogry.type';

export type SpecialProductType = {
  _id: string;
  name: string;
  name_ru: string;
  images: string[];
  price: number;
  description: string;
  description_ru: string;
  deliveryInfo: string;
  deliveryInfo_ru: string;
  subCategoryId: SubCategoryType;
  categoryId: CategoryType;
  createdAt: string;
  updatedAt: string;
};

export type FetchSepcialProductsParamsType = {
  page?: number;
  limit?: number;
  sortOrder?: string;
  search?: string;
  maxPrice?: string;
  minPrice?: string;
  categoryIds?: string[];
  subCategoryIds?: string[];
};

export type ResponseSpecialProductsType = {
  data?: SpecialProductType[];
  success: boolean;
  message?: string;
  pagination?: PaginationOptionsType;
  total?: number;
};

export type ResponseSpecialProductType = {
  data?: SpecialProductType;
  success: boolean;
  message?: string;
};

export type ResponseUploadImageType = {
  data?: string[];
  success: boolean;
  message?: string;
};
