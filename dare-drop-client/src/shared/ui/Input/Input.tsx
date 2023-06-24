import {
  memo,
  type FC,
  type InputHTMLAttributes,
  forwardRef,
  ForwardedRef,
  ChangeEvent,
} from "react";

import cls from "./Input.module.scss";

import classNames from "classnames";
import { ChangeHandler } from "react-hook-form";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "readOnly"
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: ChangeHandler;
  round?: boolean;
}

export const Input: FC<InputProps> = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { className, value, onChange, type = "text", ...other } = props;

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <input
        {...other}
        className={classNames(cls.Input, {}, [className])}
        value={value}
        onChange={onChangeHandler}
        type={type}
        ref={ref}
      />
    );
  }
);
