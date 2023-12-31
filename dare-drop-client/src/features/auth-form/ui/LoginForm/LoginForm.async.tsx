import { lazy } from "react";
import { Suspense } from "react";

import { type LoginFormProps } from "./LoginForm";
import { Loader } from "@/shared/ui/Loader";

const LoginForm = lazy(() => import("./LoginForm"));

export const LoginFormAsync = (props: LoginFormProps) => {
  return (
    <Suspense
      fallback={
        <div className="loader">
          <Loader />
        </div>
      }
    >
      <LoginForm {...props} />
    </Suspense>
  );
};
