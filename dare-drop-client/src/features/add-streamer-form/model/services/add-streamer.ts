import { Streamer } from "@/entities/streamer";
import { $api } from "@/shared/api/api";
import { Platform } from "@/shared/consts/platform";

export interface AddStreamerArgs {
  name: string;
  platform: Platform;
  description: string;
}

export const addStreamer = async (args: AddStreamerArgs): Promise<Streamer> => {
  const response = await $api.post("/streamers", args);
  return response.data;
};
