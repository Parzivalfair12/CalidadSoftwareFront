import { Outlet } from "react-router-dom";

import SlideBar from "../Components/SlideBar";
import { Header } from "../Components/Header";

export const AppLayout = () => {
  return (
    <>
      <div className="container">
        <SlideBar />

        <main className="main-content">
          <Header />
          <Outlet />
        </main>
      </div>
    </>
  );
};
