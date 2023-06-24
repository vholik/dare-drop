import { FC, memo, useCallback } from "react";
import { Streamer, StreamerRow } from "@/entities/streamer";
import { VoteStreamer } from "@/features/vote-streamer";
import cls from "./StreamersList.module.scss";
import classNames from "classnames";
import { Note } from "@/shared/ui/Note";

interface StreamersListProps {
  className?: string;
  isLoading?: boolean;
  isError?: boolean;
  streamers?: Streamer[];
}

export const StreamersList: FC<StreamersListProps> = memo((props) => {
  const { className, isError, isLoading, streamers: data } = props;

  const renderRow = useCallback((streamer: Streamer) => {
    return (
      <StreamerRow
        streamer={streamer}
        key={streamer.id}
        right={
          <VoteStreamer
            streamerId={streamer.id}
            voteCount={streamer.voteCount}
          />
        }
      />
    );
  }, []);

  if (isLoading) {
    return (
      <div className={classNames(cls.StreamersList, {}, [className])}>
        <StreamerRow isLoading />
        <StreamerRow isLoading />
        <StreamerRow isLoading />
        <StreamerRow isLoading />
      </div>
    );
  }

  if (isError) {
    return <Note />;
  }

  return (
    <div className={classNames(cls.StreamersList, {}, [className])}>
      {data?.length ? data?.map(renderRow) : "List is empty"}
    </div>
  );
});
