import { useMutation } from "@tanstack/react-query";
import { VoteStreamerArgs, voteStreamer } from "../services/vote-streamer";
import { VoteState } from "@/shared/types/vote";
import { useCallback } from "react";
import { useDebounce } from "@/shared/lib/hooks";
import { socket } from "../../../../shared/api/socket";
import { Streamer } from "@/entities/streamer";
import { USE_STREAMERS_QUERY_KEY } from "./use-streamers";
import { queryClient } from "@/shared/api/query-client";
import { useSocket } from "./use-socket";
import { useUserStore } from "@/entities/user";
import { openAuthForm } from "@/features/auth-form";

export function useVoteStreamer() {
  const { mutate } = useMutation({
    mutationFn: (body: VoteStreamerArgs) => voteStreamer(body),
  });
  const isAuth = useUserStore().isAuth;

  const { isConnected } = useSocket();

  const voteHandler = useCallback(
    (streamerId: string, voteState: VoteState) => {
      if (!isAuth) {
        openAuthForm();
        return;
      }

      mutate(
        { id: streamerId, voteState: voteState },
        {
          onSuccess: (res) => {
            const { voteCount, isDownvoted, isUpvoted } = res;

            if (isConnected) {
              socket.emit("vote-streamer", {
                id: streamerId,
              });
            }

            // Update streamers list
            queryClient.setQueryData<Streamer[]>(
              [USE_STREAMERS_QUERY_KEY],
              (oldData) =>
                oldData
                  ? oldData.map((streamer) =>
                      streamer.id === streamerId
                        ? {
                            ...streamer,
                            isDownvoted,
                            isUpvoted,
                            count: voteCount,
                          }
                        : streamer
                    )
                  : oldData
            );
          },
        }
      );
    },
    [isAuth, isConnected, mutate]
  );

  return { voteHandler: useDebounce(voteHandler, 250) };
}
