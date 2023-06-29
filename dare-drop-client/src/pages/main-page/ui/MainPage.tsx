import { FC, useCallback } from "react";
import { AddStreamerForm } from "@/features/add-streamer-form";
import {
  StreamersListCard,
  USE_STREAMERS_QUERY_KEY,
  fetchStreamers,
} from "@/widgets/streamers-list-card";
import cls from "./MainPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { socket } from "@/shared/api/socket";

const MainPage: FC = () => {
  const { refetch } = useQuery([USE_STREAMERS_QUERY_KEY], fetchStreamers);

  const onAddStreamer = useCallback(() => {
    refetch();
    console.log("ADDING STREAMER");
    socket.emit("create-streamer");
  }, [refetch]);

  return (
    <div className={cls.MainPage}>
      <AddStreamerForm onAddStreamer={onAddStreamer} />
      <StreamersListCard />
    </div>
  );
};

export default MainPage;
