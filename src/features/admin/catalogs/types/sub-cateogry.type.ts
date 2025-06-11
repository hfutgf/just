import { GroupType } from './group.types';

export type SubCategoryType = {
  _id: string;
  subCategoryName: string;
  subCategoryName_ru: string;
  groups?: GroupType[];
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginationOptionsType = {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
};
