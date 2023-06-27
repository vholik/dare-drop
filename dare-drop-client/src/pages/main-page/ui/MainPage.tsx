import { FC, useCallback, useState } from "react";
import { AddStreamerForm } from "@/features/add-streamer-form";
import { StreamersListCard } from "@/widgets/streamers-list-card";
import { useStreamers } from "../model/lib/use-streamers";
import cls from "./MainPage.module.scss";

export const MainPage: FC = () => {
  const { isError, data: streamers, isLoading, refetch } = useStreamers();

  const onAddStreamer = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className={cls.MainPage}>
      <AddStreamerForm onAddStreamer={onAddStreamer} />
      <StreamersListCard
        streamers={streamers}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};
