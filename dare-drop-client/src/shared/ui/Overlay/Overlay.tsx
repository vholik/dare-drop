import { type FC, memo } from "react";

import cls from "./Overlay.module.scss";

import classNames from "classnames";

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay: FC<OverlayProps> = memo((props) => {
  const { className, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={classNames(cls.Overlay, {}, [className])}
    ></div>
  );
});
