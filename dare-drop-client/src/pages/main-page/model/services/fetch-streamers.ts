import { Streamer } from "@/entities/streamer";
import { $api } from "@/shared/api/api";

export const fetchStreamers = async (): Promise<Streamer[]> => {
  const response = await $api.get(`/streamers`);
  return response.data;
};
