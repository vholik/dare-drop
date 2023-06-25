import { FC } from "react";
import cls from "./StreamerDetailsPage.module.scss";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { StreamerCard } from "@/entities/streamer";
import { Heading } from "@/shared/ui/Heading";

export const StreamerDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <div className={classNames(cls.StreamerDetails, {}, "container")}>
      <Heading label="Streamer's page" />
      <StreamerCard id={id} />
    </div>
  );
};
