import { FC } from "react";
import cls from "./StreamerDetailsPage.module.scss";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { StreamerCard } from "@/entities/streamer";
import { Heading } from "@/shared/ui/Heading";
import { __API_URL__ } from "@/shared/consts/api";

export const StreamerDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={classNames(cls.StreamerDetails, {}, "container")}>
      <Heading label="Streamer's page" />
      <StreamerCard />
    </div>
  );
};
