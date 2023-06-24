import { $api } from "@/shared/api/api";
import { VoteState } from "@/shared/types/vote";

export interface VoteStreamerArgs {
  voteState: VoteState;
  id: number;
}

interface VoteStreamerResponse {
  voteCount: number;
}

export const voteStreamer = async (
  args: VoteStreamerArgs
): Promise<VoteStreamerResponse> => {
  const { id, voteState } = args;

  const response = await $api.put(`/streamers/${id}/vote`, {
    state: voteState,
  });
  return response.data;
};
