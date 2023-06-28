import { FC, memo, useEffect, useState } from "react";
import classNames from "classnames";
import cls from "./VoteStreamer.module.scss";
import UpvoteIcon from "@/shared/assets/icons/upvote-icon.svg";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { useVoteStreamer } from "../model/lib/use-vote-streamer";
import { Streamer } from "@/entities/streamer";

interface VoteStreamerProps {
  className?: string;
  streamer: Streamer;
}

/**
 * @feature VoteStreamer
 */
export const VoteStreamer: FC<VoteStreamerProps> = memo((props) => {
  const { className, streamer } = props;
  const { downvoteHandler, upvoteHandler, voteCount, vote } =
    useVoteStreamer(streamer);

  return (
    <div className={classNames(cls.VoteStreamer, {}, [className])}>
      <Button
        square
        theme="secondary"
        className={classNames("", {
          [cls.activeBtn]: vote === "upvote",
        })}
        onClick={upvoteHandler}
      >
        <UpvoteIcon className={classNames(cls.upvoteIcon, {}, [cls.icon])} />
      </Button>
      <Text text={String(voteCount)} />

      <Button
        square
        theme="secondary"
        onClick={downvoteHandler}
        className={classNames("", {
          [cls.activeBtn]: vote === "downvote",
        })}
      >
        <UpvoteIcon className={classNames(cls.downvoteIcon, {}, [cls.icon])} />
      </Button>
    </div>
  );
});
