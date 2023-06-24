import { Suspense, memo, useCallback } from "react";
import { Route, RouteProps, Routes } from "react-router-dom";
import { routeConfig } from "../config/router-config";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: RouteProps) => {
    const element = <Suspense fallback={""}>{route.element}</Suspense>;
    console.log(element);

    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
