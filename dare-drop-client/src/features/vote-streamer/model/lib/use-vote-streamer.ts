import { useMutation } from "@tanstack/react-query";
import { VoteStreamerArgs, voteStreamer } from "../services/vote-streamer";
import { VoteState } from "@/shared/types/vote";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/shared/lib/hooks";
import { socket } from "../../api/socket";
import { Streamer } from "@/entities/streamer";

interface OnGetNewStreamerResponse {
  id: string;
}

interface OnGetStreamerVoteResponse {
  id: string;
  state: VoteState;
}

function useVoteApi(streamerId: number) {
  const { mutate } = useMutation({
    mutationFn: (body: VoteStreamerArgs) => voteStreamer(body),
    // onSuccess: () => console.log("success"),
  });

  const voteHandler = useCallback(
    (voteState: VoteState, cb?: () => void) => {
      mutate(
        { id: streamerId, voteState: voteState },
        {
          onSuccess: () => cb?.(),
        }
      );
    },
    [mutate, streamerId]
  );

  return { voteHandler };
}

function useSocket() {
  // const [isConnected, setIsConnected] = useState(socket.connected);

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onGetNewStreamer({ id }: OnGetNewStreamerResponse) {
  //     console.log(id);
  //   }

  //   function onGetStreamerVote({ id, state }: OnGetStreamerVoteResponse) {
  //     console.log(id, state);
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);
  //   socket.on("get-new-stremer", onGetNewStreamer);
  //   socket.on("get-streamer-vote", onGetStreamerVote);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //     socket.off("get-new-stremer", onGetNewStreamer);
  //     socket.off("get-streamer-vote", onGetStreamerVote);
  //   };
  // }, []);

  return { isConnected: false };

  return useMemo(() => ({ isConnected }), [isConnected]);
}

function getVote(
  isUpvoted?: boolean,
  isDownvoted?: boolean
): VoteState | undefined {
  if (isUpvoted) {
    return "upvote";
  } else if (isDownvoted) {
    return "downvote";
  }

  return;
}

export function useVoteStreamer(streamer: Streamer) {
  const [vote, setVote] = useState<VoteState | undefined>(
    getVote(streamer.isUpvoted, streamer.isDownvoted)
  );
  const [voteCount, setVoteCount] = useState<number>(streamer.count || 0);
  const { voteHandler: handler } = useVoteApi(streamer.id);
  const { isConnected } = useSocket();

  const voteHandler = useDebounce(handler, 250);

  const upvoteHandler = useCallback(() => {
    if (vote === "upvote") {
      voteHandler("downvote", () => {
        setVote(undefined);
        setVoteCount((prev) => --prev);
        // if (isConnected === true) {
        //   socket.emit("vote-streamer", { id: streamer.id, state: "downvote" });
        // }
      });
    } else {
      voteHandler("upvote", () => {
        setVote("upvote");
        setVoteCount((prev) => ++prev);

        // if (isConnected === true) {
        //   socket.emit("vote-streamer", { id: streamer.id, state: "upvote" });
        // }
      });
    }
  }, [isConnected, streamer.id, vote, voteHandler]);

  const downvoteHandler = useCallback(() => {
    if (vote === "downvote") {
      voteHandler("upvote", () => {
        setVote(undefined);
        setVoteCount((prev) => ++prev);

        // if (isConnected === true) {
        //   socket.emit("vote-streamer", { id: streamer.id, state: "upvote" });
        // }
      });
    } else {
      voteHandler("downvote", () => {
        setVote("downvote");
        setVoteCount((prev) => --prev);

        // if (isConnected === true) {
        //   socket.emit("vote-streamer", { id: streamer.id, state: "downvote" });
        // }
      });
    }
  }, [isConnected, streamer.id, vote, voteHandler]);

  return {
    voteCount,
    downvoteHandler,
    upvoteHandler,
    vote,
  };
}
