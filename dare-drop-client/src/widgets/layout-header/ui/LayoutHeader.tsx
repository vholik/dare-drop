import { FC } from "react";

import cls from "./LayoutHeader.module.scss";

export const LayoutHeader: FC = () => {
  return (
    <div className={cls.LayoutHeader}>
      This page was created by&nbsp;
      <a href="https://viktorholik.pl" target="_blank">
        Viktor Holik
      </a>
    </div>
  );
};
