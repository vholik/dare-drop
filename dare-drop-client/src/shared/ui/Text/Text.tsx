import { FC, memo } from "react";
import classNames from "classnames";
import cls from "./Text.module.scss";

type TextSize = "size_s" | "size_m" | "size_l";
type TextColor = "primary" | "secondary";
type TextWeigth = "regular" | "medium" | "bold";

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeigth;
}

export const Text: FC<TextProps> = memo((props) => {
  const {
    className,
    text,
    title,
    size = "size_m",
    color = "primary",
    weight = "regular",
  } = props;

  return (
    <div
      className={classNames(cls.Text, {}, [
        className,
        cls[size],
        cls[color],
        cls[weight],
      ])}
    >
      <h1 className={cls.title}>{title}</h1>
      <p className={cls.text}>{text}</p>
    </div>
  );
});
