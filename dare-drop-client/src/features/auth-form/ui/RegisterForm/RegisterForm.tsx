import { FC, memo } from "react";
import classNames from "classnames";
import cls from "./RegisterForm.module.scss";
import { Text } from "@/shared/ui/Text";
import { Note } from "@/shared/ui/Note";
import { Label } from "@/shared/ui/Label";
import { Input } from "@/shared/ui/Input";
import { SubmitHandler } from "react-hook-form";
import { useAuth } from "../../model/lib/use-auth";
import { Button } from "@/shared/ui/Button";
import { SingUpArgs, signUp } from "../../model/services/sign-up";

export interface RegisterFormProps {
  className?: string;
  onSuccess?: ({ accessToken }: { accessToken: string }) => void;
}

const RegisterForm: FC<RegisterFormProps> = memo((props) => {
  const { className, onSuccess } = props;
  const {
    mutate,
    isLoading,
    error,
    formErrors,
    handleSubmit,
    register,
    watch,
  } = useAuth({ onSuccessFunc: onSuccess, fn: signUp });

  return (
    <form
      onSubmit={handleSubmit(mutate as SubmitHandler<SingUpArgs>)}
      className={classNames("", {}, [className])}
    >
      <Text title="Sign up" size="size_m" weight="bold" />
      <Text
        text="Sign up to vote users"
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
        <Label label="Repeat password">
          <Input
            type="password"
            {...register("confirmPassword", {
              required: {
                message: "Please provide password",
                value: true,
              },
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Your passwords do no match";
                }
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
        {formErrors.confirmPassword && (
          <Note message={formErrors.confirmPassword.message} />
        )}
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          className={cls.button}
        >
          Sign up
        </Button>
      </div>
    </form>
  );
});

export default RegisterForm;
