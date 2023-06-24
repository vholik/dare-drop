import { FC, memo } from "react";
import classNames from "classnames";
import cls from "./StreamerCard.module.scss";
import { Streamer } from "../../model/types/streamer";
import StreamerBg from "@/shared/assets/streamer-page-bg.png";
import { Text } from "@/shared/ui/Text";
import { Avatar } from "@/shared/ui/Avatar";

interface StreamerCardProps {
  className?: string;
  streamer?: Streamer;
}

export const StreamerCard: FC<StreamerCardProps> = memo((props) => {
  const { className } = props;

  return (
    <article className={classNames(cls.StreamerCard, {}, [className])}>
      <img src={StreamerBg} alt="background" className={cls.bg} />
      <div className={cls.inner}>
        <div className={cls.info}>
          <Avatar
            size="size_l"
            src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png"
          />
          <div className={cls.heading}>
            <Text size="size_l" title="Streamer" weight="bold" />
            <Text text="Platform" color="secondary" weight="medium" />
          </div>
        </div>
        <div className={cls.description}>
          <Text text="ABOUT ME" color="secondary" size="size_s" weight="bold" />
          <Text text="Hello world" />
        </div>
      </div>
    </article>
  );
});
