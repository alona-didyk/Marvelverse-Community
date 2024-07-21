import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Sidebar } from "../SideBar/SideBar";
import "./User.scss";

export const User = () => {
  const { currentUser } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      setFavorites(parsedFavorites);
    }
  }, []);

  const addToFavorites = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFromFavorites = (item) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.id !== item.id)
    );
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites.filter((favorite) => favorite.id !== item.id))
    );
  };

  return (
    <div className="user">
      <div className="user__wrapper">
        <Sidebar />
        <div className="user__main">
          <div className="user__info">
            <h2 className="user__title">Account Info</h2>
            <span className="user__name">
              Username: {currentUser.displayName}
            </span>
            <span className="user__name">
              Email Address: {currentUser.email}
            </span>
          </div>
          <hr />

          <div className="user__add">
            <h2 className="user__fav">Favorites</h2>
            <ul className="user__nav">
              {favorites.map((favorite, index) => (
                <li className="user__list" key={index}>
                  {favorite.title}
                  <button
                    className="button"
                    onClick={() => removeFromFavorites(favorite)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
