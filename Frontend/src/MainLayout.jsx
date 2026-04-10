import Nav from "./features/shared/components/Nav";
import BottomNavbar from "./features/shared/components/BottomNav";
import { Outlet } from "react-router";
import "./styles/MainLayout.scss"

const MainLayout = () => {
  return (
    <div className="app-container">
      <Nav />

      <main className="content">
        <Outlet />
      </main>

      <BottomNavbar />
    </div>
  );
};

export default MainLayout;
