import { FC, memo } from "react";
import classNames from "classnames";
import cls from "./Tabs.module.scss";

interface TabsProps {
  className?: string;
  activeOption: string;
  options: TabOption[];
  onChange: (value: string) => void;
}

export interface TabOption {
  value: string;
  content: string;
}

export const Tabs: FC<TabsProps> = memo((props) => {
  const { className, activeOption, options, onChange } = props;

  const onChangeHandler = (value: string) => {
    return () => onChange(value);
  };

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={onChangeHandler(option.value)}
          className={classNames(cls.btn, {
            [cls.activeBtn]: option.value === activeOption,
          })}
        >
          {option.content}
        </button>
      ))}
    </div>
  );
});
