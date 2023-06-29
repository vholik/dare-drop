import { useMutation } from "@tanstack/react-query";
import { AddStreamerArgs, addStreamer } from "../services/add-streamer";
import { Platform } from "@/shared/consts/platform";
import { useForm } from "react-hook-form";
import { ApiAxiosError } from "@/shared/types/api";

export function useAddStreamer(onAddStreamer?: () => void) {
  const { mutate, isLoading, error } = useMutation({
    mutationFn: (body: AddStreamerArgs) => addStreamer(body),
    onSuccess: () => {
      onAddStreamer?.();
      reset();
    },
    onError: (err: ApiAxiosError) => err,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AddStreamerArgs>({
    mode: "onBlur",
    defaultValues: {
      platform: Platform.TWITCH,
    },
  });

  return { mutate, isLoading, error, register, handleSubmit, control, errors };
}
