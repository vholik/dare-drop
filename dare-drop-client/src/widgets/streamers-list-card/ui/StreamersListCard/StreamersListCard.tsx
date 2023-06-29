import { FC, memo } from "react";
import classNames from "classnames";
import cls from "./StreamersListCard.module.scss";
import { StreamersList } from "../StreamersList/StreamersList";
import { Heading } from "@/shared/ui/Heading";

interface StreamersCardProps {
  className?: string;
}

export const StreamersListCard: FC<StreamersCardProps> = memo((props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.StreamersListCard, {}, [className])}>
      <Heading label="Streamers" />
      <StreamersList className={cls.list} />
    </div>
  );
});
