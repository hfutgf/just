import { PaginationOptionsType, SucCategoryType } from '@/fetures/types/sub-cateogry.type';

export type SpecialProductType = {
  _id: string;
  name: string;
  name_ru: string;
  images: string[];
  price: string;
  subCategoryId: SucCategoryType;
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
};

export type ResponseSpecialProductsType = {
  data?: SpecialProductType[];
  success: boolean;
  message?: string;
  pagination?: PaginationOptionsType;
  total?: number;
};
