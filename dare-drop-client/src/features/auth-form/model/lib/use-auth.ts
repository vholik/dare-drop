import { useMutation } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import { ApiAxiosError } from "@/shared/api/ErrorResponse";
import { REFRESH_TOKEN_LOCALSTORAGE_KEY } from "@/shared/consts/local-storage";
import { AuthResponse } from "@/entities/user";

interface UseAuthArgs<T> {
  onSuccessFunc?: (args: { accessToken: string }) => void;
  fn: (args: T) => Promise<AuthResponse>;
}

export function useAuth<T extends FieldValues>({
  onSuccessFunc,
  fn,
}: UseAuthArgs<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<T>({
    mode: "onBlur",
  });

  const { mutate, isLoading, error } = useMutation({
    mutationFn: (body: T) => fn(body),
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
    watch,
    formErrors: errors,
  };
}
