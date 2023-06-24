import { useMutation } from "@tanstack/react-query";
import { VoteStreamerArgs, voteStreamer } from "../services/vote-streamer";
import { VoteState } from "@/shared/types/vote";
import { useCallback, useMemo, useState } from "react";

function useVoteApi(streamerId: number) {
  const { mutate } = useMutation({
    mutationFn: (body: VoteStreamerArgs) => voteStreamer(body),
    // onSuccess: () => {},
  });

  function voteHandler(voteState: VoteState, cb?: () => void) {
    mutate(
      { id: streamerId, voteState: voteState },
      {
        onSuccess: () => cb?.(),
      }
    );
  }

  return { voteHandler };
}

export function useVoteStreamer(streamerId: number, defaultVoteCount: number) {
  const [vote, setVote] = useState<VoteState | undefined>();
  const [voteCount, setVoteCount] = useState<number>(defaultVoteCount || 0);
  const { voteHandler } = useVoteApi(streamerId);

  const upvoteHandler = useCallback(() => {
    if (vote === "upvote") {
      voteHandler("downvote", () => {
        setVote(undefined);
        setVoteCount((prev) => --prev);
      });
    } else {
      voteHandler("upvote", () => {
        setVote("upvote");
        setVoteCount((prev) => ++prev);
      });
    }
  }, [vote, voteHandler]);

  const downvoteHandler = useCallback(() => {
    if (vote === "downvote") {
      voteHandler("upvote", () => {
        setVote(undefined);
        setVoteCount((prev) => ++prev);
      });
    } else {
      voteHandler("downvote", () => {
        setVote("downvote");
        setVoteCount((prev) => --prev);
      });
    }
  }, [vote, voteHandler]);

  return useMemo(
    () => ({
      voteCount,
      downvoteHandler,
      upvoteHandler,
      vote,
    }),
    [downvoteHandler, upvoteHandler, vote, voteCount]
  );
}
