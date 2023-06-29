import { Platform } from "@/shared/consts/platform";

export interface Streamer {
  id: string;
  name: string;
  description: string;
  image: string;
  platform: Platform;
  count: number;
  isDownvoted?: boolean;
  isUpvoted?: boolean;
}
