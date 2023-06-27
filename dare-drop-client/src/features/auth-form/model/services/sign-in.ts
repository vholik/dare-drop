import { AuthResponse } from "@/entities/user";
import { $api } from "@/shared/api/api";

export interface SingInArgs {
  email: string;
  password: string;
}

export const signIn = async (args: SingInArgs): Promise<AuthResponse> => {
  const response = await $api.post("/authentication/signin", args);
  return response.data;
};
