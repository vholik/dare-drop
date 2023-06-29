import { lazy } from "react";
import { Suspense } from "react";

import { Loader } from "@/shared/ui/Loader";
import { RegisterFormProps } from "./RegisterForm";

const RegisterForm = lazy(() => import("./RegisterForm"));

export const RegisterFormAsync = (props: RegisterFormProps) => {
  return (
    <Suspense
      fallback={
        <div className="loader">
          <Loader />
        </div>
      }
    >
      <RegisterForm {...props} />
    </Suspense>
  );
};
