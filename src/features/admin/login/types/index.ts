export type LoginAdminForm = {
  username: string;
  password: string;
};

export type LoginAdminResponse = {
  success: boolean;
  message: string;
  admin: {
    _id: number;
    username: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
};
