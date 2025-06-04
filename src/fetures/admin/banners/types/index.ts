export type BannerType = {
  _id: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type BannerResponse = {
  data?: BannerType[];
  success: boolean;
  message?: string;
};
