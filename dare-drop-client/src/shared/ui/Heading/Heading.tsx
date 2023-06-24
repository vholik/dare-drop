import { FC, memo } from "react";
import cls from "./Heading.module.scss";
import classNames from "classnames";

interface HeadingProps {
  className?: string;
  label: string;
}

export const Heading: FC<HeadingProps> = memo((props) => {
  const { className, label } = props;

  return (
    <div className={classNames(cls.Heading, {}, [className])}>
      {label}
      <hr className={cls.line} />
    </div>
  );
});
