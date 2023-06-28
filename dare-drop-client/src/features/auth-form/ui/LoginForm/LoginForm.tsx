import { FC, memo } from "react";
import classNames from "classnames";
import cls from "./LoginForm.module.scss";
import { Label } from "@/shared/ui/Label";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import { SingInArgs, signIn } from "../../model/services/sign-in";
import { SubmitHandler } from "react-hook-form";
import { Note } from "@/shared/ui/Note";
import { useAuth } from "../../model/lib/use-auth";

export interface LoginFormProps {
  className?: string;
  onSuccess?: (args: { accessToken: string }) => void;
}

/**
 * @feature AuthForm modal
 */
const LoginForm: FC<LoginFormProps> = memo((props) => {
  const { className, onSuccess } = props;
  const { mutate, isLoading, error, formErrors, handleSubmit, register } =
    useAuth({ onSuccessFunc: onSuccess, fn: signIn });

  return (
    <form
      onSubmit={handleSubmit(mutate as SubmitHandler<SingInArgs>)}
      className={classNames("", {}, [className])}
    >
      <Text title="Log in" size="size_m" weight="bold" />
      <Text
        text="Log in to vote users"
        color="secondary"
        className={cls.subtitle}
      />
      {error && <Note message={error?.response?.data?.message || "error"} />}
      <div className={cls.inner}>
        <Label label="Your email">
          <Input
            {...register("email", {
              required: {
                message: "Please provide email",
                value: true,
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
              minLength: {
                message: "Min email length is 3",
                value: 3,
              },

              maxLength: {
                message: "Max email length is 50",
                value: 50,
              },
            })}
          />
          {formErrors.email && <Note message={formErrors.email.message} />}
        </Label>
        <Label label="Your password">
          <Input
            type="password"
            {...register("password", {
              required: {
                message: "Please provide password",
                value: true,
              },
              minLength: {
                message: "Min password length is 3",
                value: 3,
              },

              maxLength: {
                message: "Max password length is 50",
                value: 50,
              },
            })}
          />
        </Label>
        {formErrors.password && <Note message={formErrors.password.message} />}
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          className={cls.button}
        >
          Submit
        </Button>
      </div>
    </form>
  );
});

export default LoginForm;
