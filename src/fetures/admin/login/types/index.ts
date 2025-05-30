export type LoginForm = {
  username: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    _id: number;
    username: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
};
