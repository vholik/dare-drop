import { FC, memo } from "react";
import classNames from "classnames";
import cls from "./StreamersListCard.module.scss";
import { StreamersList } from "../StreamersList/StreamersList";
import { Heading } from "@/shared/ui/Heading";
import { Streamer } from "@/entities/streamer";

interface StreamersCardProps {
  className?: string;
  streamers?: Streamer[];
  isError?: boolean;
  isLoading?: boolean;
}

export const StreamersListCard: FC<StreamersCardProps> = memo((props) => {
  const { className, streamers, isError, isLoading } = props;

  return (
    <div className={classNames(cls.StreamersListCard, {}, [className])}>
      <Heading label="Streamers" />
      <StreamersList
        className={cls.list}
        streamers={streamers}
        isError={isError}
        isLoading={isLoading}
      />
    </div>
  );
});
