import { FC, memo } from "react";
import classNames from "classnames";
import cls from "./StreamerCard.module.scss";
import StreamerBg from "@/shared/assets/streamer-page-bg.png";
import { Text } from "@/shared/ui/Text";
import { Avatar } from "@/shared/ui/Avatar";
import { useFetchStreamerById } from "../../model/lib/use-fetch-streamer-by-id";
import { Note } from "@/shared/ui/Note";
import { Skeleton } from "@/shared/ui/Skeleton";
import { platformMapper } from "@/shared/consts/platform";

interface StreamerCardProps {
  className?: string;
  id: string;
}

export const StreamerCard: FC<StreamerCardProps> = memo((props) => {
  const { className, id } = props;
  const { data: streamer, isLoading, isError } = useFetchStreamerById(id);

  if (isLoading) {
    return (
      <article className={classNames(cls.StreamerCard, {}, [className])}>
        <img src={StreamerBg} alt="background" className={cls.bg} />
        <div className={cls.inner}>
          <div className={cls.info}>
            <Skeleton circle width={120} height={120} />
            <div className={cls.heading}>
              <Skeleton width={180} height={20} />
              <Skeleton width={100} height={15} />
            </div>
          </div>
          <div className={cls.description}>
            <Skeleton width={80} height={15} />
            <Skeleton height={15} count={3} />
          </div>
        </div>
      </article>
    );
  }

  if (isError) {
    return <Note message="Error occured while fetching streamer's data" />;
  }

  if (!streamer) {
    return null;
  }

  return (
    <article className={classNames(cls.StreamerCard, {}, [className])}>
      <img src={StreamerBg} alt="background" className={cls.bg} />
      <div className={cls.inner}>
        <div className={cls.info}>
          <Avatar size="size_l" src={streamer.image} />
          <div className={cls.heading}>
            <Text size="size_l" title={streamer.name} weight="bold" />
            <Text
              text={platformMapper[streamer.platform]}
              color="secondary"
              weight="medium"
            />
          </div>
        </div>
        <div className={cls.description}>
          <Text text="ABOUT ME" color="secondary" size="size_s" weight="bold" />
          <Text text={streamer.description} />
        </div>
      </div>
    </article>
  );
});
