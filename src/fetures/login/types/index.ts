export type LoginFormType = {
  authCode: string;
};

export type LoginResponseType = {
  accessToken?: string;
  message?: string;
  success: boolean;
  codeStatus: string;
};
