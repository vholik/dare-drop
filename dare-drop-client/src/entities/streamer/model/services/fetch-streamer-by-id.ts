import { $api } from "@/shared/api/api";
import { Streamer } from "../types/streamer";

export const fetchStreamerById = async (id: string): Promise<Streamer> => {
  const response = await $api.get(`/streamer/${id}`);
  return response.data;
};
