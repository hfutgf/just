export type GroupType = {
  _id: string;
  group: string;
  group_ru: string;
  categoryId: string;
  subCategoryId: string;
  createdAt: string;
  updatedAt?: string;
};

export type GroupResponseType = {
  data: GroupType[];
  success: boolean;
  message?: string;
};
