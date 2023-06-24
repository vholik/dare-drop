import { FC } from "react";
import "./styles/index.scss";
import { AppRouter } from "./router";
import { LayoutHeader } from "@/widgets/layout-header";

const App: FC = () => {
  return (
    <>
      <LayoutHeader />
      <div className="app">
        <AppRouter />
      </div>
    </>
  );
};

export default App;
