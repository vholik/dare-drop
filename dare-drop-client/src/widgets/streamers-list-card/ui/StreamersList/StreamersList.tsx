import { FC, memo, useCallback } from "react";
import { Streamer, StreamerRow } from "@/entities/streamer";
import cls from "./StreamersList.module.scss";
import classNames from "classnames";
import { Note } from "@/shared/ui/Note";
import { useStreamers } from "../../model/lib/use-streamers";

import { VoteStreamer } from "@/features/vote-streamer";

import { useVoteStreamer } from "../../model/lib/use-vote-streamer";
import { VoteState } from "@/shared/types/vote";

interface StreamersListProps {
  className?: string;
}

export const StreamersList: FC<StreamersListProps> = memo((props) => {
  const { className } = props;
  const { voteHandler } = useVoteStreamer();

  const { isError, data: streamers, isLoading } = useStreamers();

  const onVoteStreamer = useCallback(
    (streamerId: string, voteState: VoteState) => {
      voteHandler(streamerId, voteState);
    },
    [voteHandler]
  );

  const renderRow = useCallback(
    (streamer: Streamer) => {
      return (
        <StreamerRow
          streamer={streamer}
          key={streamer.id}
          right={
            <VoteStreamer
              isDownvoted={streamer.isDownvoted}
              isUpvoted={streamer.isUpvoted}
              voteCount={streamer.count}
              voteHandler={onVoteStreamer}
              streamerId={streamer.id}
            />
          }
        />
      );
    },
    [onVoteStreamer]
  );

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
      {streamers?.length ? streamers?.map(renderRow) : "List is empty"}
    </div>
  );
});
