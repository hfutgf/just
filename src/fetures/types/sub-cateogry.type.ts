export type SucCategoryType = {
  _id: string;
  subCategoryName: string;
  subCategoryName_ru: string;
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
