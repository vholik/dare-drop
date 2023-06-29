import { FC, ImgHTMLAttributes, memo } from "react";
import classNames from "classnames";
import cls from "./Avatar.module.scss";

type AvatarSize = "size_m" | "size_l";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  size?: AvatarSize;
}

export const Avatar: FC<AvatarProps> = memo((props) => {
  const { className, size = "size_m", alt = "avatar", ...otherProps } = props;

  return (
    <img
      {...otherProps}
      alt={alt}
      className={classNames(cls.Avatar, {}, [className, [cls[size]]])}
    />
  );
});
