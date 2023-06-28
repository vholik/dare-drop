import { AuthResponse } from "@/entities/user";
import { $api } from "@/shared/api/api";

export interface SingUpArgs {
  email: string;
  password: string;
  confirmPassword: string;
}

export const signUp = async (args: SingUpArgs): Promise<AuthResponse> => {
  const response = await $api.post("/authentication/signup", args);
  return response.data;
};
