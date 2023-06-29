import { FC, memo, useCallback } from "react";
import classNames from "classnames";
import cls from "./VoteStreamer.module.scss";
import UpvoteIcon from "@/shared/assets/icons/upvote-icon.svg";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { VoteState } from "@/shared/types/vote";

interface VoteStreamerProps {
  className?: string;
  voteHandler: (streamerId: string, voteState: VoteState) => void;
  isDownvoted?: boolean;
  isUpvoted?: boolean;
  voteCount: number;
  streamerId: string;
}

/**
 * @feature VoteStreamer
 */
export const VoteStreamer: FC<VoteStreamerProps> = memo((props) => {
  const {
    className,
    voteHandler,
    isDownvoted,
    isUpvoted,
    voteCount,
    streamerId,
  } = props;

  const onVoteStreamer = useCallback(
    (streamerId: string, voteState: VoteState) => {
      return () => voteHandler(streamerId, voteState);
    },
    [voteHandler]
  );

  return (
    <div className={classNames(cls.VoteStreamer, {}, [className])}>
      <Button
        square
        theme="secondary"
        className={classNames("", {
          [cls.activeBtn]: isUpvoted,
        })}
        onClick={onVoteStreamer(streamerId, "upvote")}
      >
        {/* @ts-ignore */}
        <UpvoteIcon className={classNames(cls.upvoteIcon, cls.icon)} />
      </Button>
      <Text text={String(voteCount)} />

      <Button
        square
        theme="secondary"
        onClick={onVoteStreamer(streamerId, "downvote")}
        className={classNames("", {
          [cls.activeBtn]: isDownvoted,
        })}
      >
        {/* @ts-ignore */}
        <UpvoteIcon className={classNames(cls.downvoteIcon, cls.icon)} />
      </Button>
    </div>
  );
});
