import { FC, useCallback } from "react";
import { AddStreamerForm } from "@/features/add-streamer-form";
import { StreamersListCard } from "@/widgets/streamers-list-card";
import cls from "./MainPage.module.scss";
import { socket } from "@/shared/api/socket";
import { useStreamers } from "@/widgets/streamers-list-card";

const MainPage: FC = () => {
  const { refetch } = useStreamers();

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
