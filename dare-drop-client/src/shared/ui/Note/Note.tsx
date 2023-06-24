import { FC, memo } from "react";
import classNames from "classnames";
import cls from "./Note.module.scss";

interface NoteProps {
  className?: string;
  message?: string;
}

export const Note: FC<NoteProps> = memo((props) => {
  const { className, message = "error occured" } = props;

  return <div className={classNames(cls.Note, {}, [className])}>{message}</div>;
});
