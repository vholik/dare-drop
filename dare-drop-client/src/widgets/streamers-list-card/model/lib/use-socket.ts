import { socket } from "@/shared/api/socket";
import { useEffect, useState } from "react";
import { USE_STREAMERS_QUERY_KEY, useStreamers } from "./use-streamers";
import { queryClient } from "@/shared/api/query-client";
import { Streamer } from "@/entities/streamer";

interface OnGetStreamerVoteResponse {
  id: string;
  voteCount: number;
}

/**
 * Custom hook to incapsulate socket logic
 * @returns void
 */
export function useSocket() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const { refetch } = useStreamers();

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    function onGetNewStreamer() {
      refetch();
    }
    function onGetStreamerVote({
      id: streamerId,
      voteCount,
    }: OnGetStreamerVoteResponse) {
      // Update streamers list
      queryClient.setQueryData<Streamer[]>(
        [USE_STREAMERS_QUERY_KEY],
        (oldData) =>
          oldData
            ? oldData.map((streamer) =>
                streamer.id === streamerId
                  ? {
                      ...streamer,
                      count: voteCount,
                    }
                  : streamer
              )
            : oldData
      );
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("get-new-streamer", onGetNewStreamer);
    socket.on("get-streamer-vote", onGetStreamerVote);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("get-new-stremer", onGetNewStreamer);
      socket.off("get-streamer-vote", onGetStreamerVote);
    };
  }, [refetch]);

  return { isConnected };
}
