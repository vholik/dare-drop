import { lazy } from "react";

export const StreamerDetailsPageAsync = lazy(
  () => import("./StreamerDetailsPage")
);
