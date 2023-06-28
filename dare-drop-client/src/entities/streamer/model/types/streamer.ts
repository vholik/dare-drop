import { Platform } from "@/shared/consts/platform";

export interface Streamer {
  id: number;
  name: string;
  description: string;
  image: string;
  platform: Platform;
  count: number;
  isDownvoted?: boolean;
  isUpvoted?: boolean;
}
