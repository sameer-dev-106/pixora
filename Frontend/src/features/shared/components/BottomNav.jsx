import { Home, Bookmark, Plus, User, Search, Heart, BellDot } from "lucide-react";
import "../style/bottomNav.scss";
import { useNavigate } from "react-router";

const BottomNav = () => {

    const navigate = useNavigate()

  return (
    <div className="bottom-nav">
      <div className="nav-left">
        <Home
          onClick={() => {
            navigate("/");
          }}
        />
        <Search />
      </div>

      <div className="fab">
        <Plus
          // onClick={() => {
          //   navigate("/create-post");
          // }}
        />
      </div>

      <div className="nav-right">
        <BellDot />
        <User
          onClick={() => {
            navigate("/get-me");
          }}
        />
      </div>
    </div>
  );
};

export default BottomNav;
