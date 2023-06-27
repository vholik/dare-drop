import { useMutation } from "@tanstack/react-query";
import { SingInArgs, signIn } from "../services/sign-in";
import { useForm } from "react-hook-form";
import { ApiAxiosError } from "@/shared/api/ErrorResponse";
import { REFRESH_TOKEN_LOCALSTORAGE_KEY } from "@/shared/consts/local-storage";

export function useSignIn(
  onSuccessFunc?: (args: { accessToken: string }) => void
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingInArgs>({
    mode: "onBlur",
  });

  const { mutate, isLoading, error } = useMutation({
    mutationFn: (body: SingInArgs) => signIn(body),
    onError: (err: ApiAxiosError) => err,
    onSuccess: (data) => {
      localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, data.refreshToken);
      onSuccessFunc?.({
        accessToken: data.accessToken,
      });
    },
  });

  return {
    mutate,
    isLoading,
    error,
    register,
    handleSubmit,
    formErrors: errors,
  };
}
