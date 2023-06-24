import { FC, useCallback } from "react";
import { AddStreamerForm } from "@/features/add-streamer-form";
import { StreamersListCard } from "@/widgets/streamers-list-card";
import { useStreamers } from "../model/lib/use-streamers";

export const MainPage: FC = () => {
  const { isError, data: streamers, isLoading, refetch } = useStreamers();

  const onAddStreamer = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="container">
      <AddStreamerForm onAddStreamer={onAddStreamer} />
      <StreamersListCard
        streamers={streamers}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};
