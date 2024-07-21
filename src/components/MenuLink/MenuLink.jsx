import React, { useContext } from "react";
import "./MenuLink.scss";
import { AuthContext } from "./../../context/AuthContext";

export const MenuLink = ({ text }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="menulink">
      <span className="menuLinkTextName">
        {" "}
        {text === "Logout" && `( ${currentUser.displayName} )`}
      </span>
    </div>
  );
};
