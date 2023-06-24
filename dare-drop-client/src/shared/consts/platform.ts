export enum Platform {
  TWITCH = "twitch",
  YOUTUBE = "youtube",
  RUMBLE = "rumble",
  KICK = "kick",
  TIKTOK = "tiktok",
}

export const platformMapper: Record<Platform, string> = {
  [Platform.KICK]: "Kick",
  [Platform.RUMBLE]: "Rumble",
  [Platform.TIKTOK]: "TikTok",
  [Platform.TWITCH]: "Twitch",
  [Platform.YOUTUBE]: "YouTube",
};
