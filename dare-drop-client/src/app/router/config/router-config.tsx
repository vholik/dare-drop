import { MainPage } from "@/pages/main-page";
import { StreamerDetailsPage } from "@/pages/streamer-details-page";
import { RouteProps } from "react-router-dom";

export enum AppRoutes {
  MAIN = "main",
  STREAMER_DETAILS = "streamer_details",
}

export const getRouteMain = () => "/";
export const getRouteStreamerDetails = (id?: string) => `/${id}`;

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },

  [AppRoutes.STREAMER_DETAILS]: {
    path: getRouteStreamerDetails(":id"),
    element: <StreamerDetailsPage />,
  },
};
