import { FC } from "react";
import "./styles/index.scss";
import { AppRouter } from "./router";
import { LayoutHeader } from "@/widgets/layout-header";
import { Header } from "@/widgets/header";
import { useUserStore } from "@/entities/user";
import { Loader } from "@/shared/ui/Loader";
import { useInitUser } from "@/entities/user/model/lib/use-init-user";

const App: FC = () => {
  const inited = useUserStore()._inited;
  const { data } = useInitUser();

  return (
    <>
      <LayoutHeader />

      {inited ? (
        <div className="container">
          <Header />
          <AppRouter />
        </div>
      ) : (
        <div className="loader">
          <Loader />
        </div>
      )}
    </>
  );
};

export default App;
