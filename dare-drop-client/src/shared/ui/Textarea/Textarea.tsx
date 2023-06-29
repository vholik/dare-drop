import { FC, ForwardedRef, TextareaHTMLAttributes, forwardRef } from "react";
import classNames from "classnames";
import cls from "./Textarea.module.scss";

type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "onChange" | "readOnly"
>;

interface InputProps extends TextareaProps {
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  round?: boolean;
}

export const Textarea: FC<TextareaProps> = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { className, value, onChange, ...other } = props;

    const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <textarea
        {...other}
        className={classNames(cls.Textarea, {}, [className])}
        value={value}
        onChange={onChangeHandler}
        ref={ref}
      />
    );
  }
);
