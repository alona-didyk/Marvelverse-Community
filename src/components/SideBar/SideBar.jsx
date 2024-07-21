import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { MenuLink } from "../../components/MenuLink/MenuLink";
import "./SideBar.scss";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/icons/logout.svg";

export const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__wrapper">
        <span className="sidebar__span" onClick={handleLogout}>
          <img className="sidebar__img" src={icon} alt="img" />
          <MenuLink className="sidebar__text" text="Logout" />
        </span>
      </div>
    </div>
  );
};
