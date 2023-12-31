import { FC, ReactNode, memo } from "react";
import cls from "./StreamerRow.module.scss";
import classNames from "classnames";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Text } from "@/shared/ui/Text";
import { Skeleton } from "@/shared/ui/Skeleton";
import { Streamer } from "../..";
import { Link } from "react-router-dom";
import { getRouteStreamerDetails } from "@/app/router/config/router-config";
import { platformMapper } from "@/shared/consts/platform";

interface StreamerRowProps {
  className?: string;
  right?: ReactNode;
  isLoading?: boolean;
  streamer?: Streamer;
}

export const StreamerRow: FC<StreamerRowProps> = memo((props) => {
  const { className, right, isLoading, streamer } = props;

  if (isLoading) {
    return (
      <article className={classNames(cls.StreamerRow, {}, [className])}>
        <div className={cls.left}>
          <Skeleton circle height={50} width={50} />
          <div>
            <Skeleton width={150} height={15} />
            <Skeleton width={80} height={15} />
          </div>
        </div>
      </article>
    );
  }

  if (!streamer) {
    return null;
  }

  return (
    <article className={classNames(cls.StreamerRow, {}, [className])}>
      <Link
        to={getRouteStreamerDetails(String(streamer.id))}
        className={cls.left}
      >
        <Avatar src={streamer?.image} alt="avatar" className={cls.avatar} />
        <div>
          <Text title={streamer?.name} weight="medium" size="size_s" />
          <Text
            text={platformMapper[streamer?.platform]}
            size="size_s"
            color={"secondary"}
          />
        </div>
      </Link>
      {right}
    </article>
  );
});
