import { Outlet, Link } from "react-router-dom";
import logo from "../../assets/images/logo.webp";
import "./Header.scss";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Header = ({ hideEntryPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef = useRef(null);
  const burgerButtonRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <header ref={headerRef} className={`header ${menuOpen ? "open" : ""}`}>
        <div className="header__wrapper">
          <div className="header__subwrapper">
            <button
            aria-label="burger"
              ref={burgerButtonRef}
              className="header__burger-button"
              id="burger-button"
              onClick={toggleMenu}
            >
              <span className="header__burger-button-line"></span>
              <span className="header__burger-button-line"></span>
              <span className="header__burger-button-line"></span>
            </button>
            <img className="header__logo" src={logo} alt="logo" />
          </div>
          <div className="header__container">
            <ul className="header__nav">
              <li>
                <Link
                  to="/"
                  className="header__nav--item"
                  onClick={() => setMenuOpen(false)}
                >
                  Homepage
                </Link>
              </li>
              <li>
                <Link
                  to="/movie"
                  className="header__nav--item"
                  onClick={() => setMenuOpen(false)}
                >
                  Movie
                </Link>
              </li>
              <li>
                <Link
                  to="/comic"
                  className="header__nav--item"
                  onClick={() => setMenuOpen(false)}
                >
                  Comic
                </Link>
              </li>
              <li>
                <Link
                  to="/chat"
                  className="header__nav--item"
                  onClick={() => setMenuOpen(false)}
                >
                  Community
                </Link>
              </li>
            </ul>
            <div className="header__buttons">
              <li>
                <Link
                  to="/login"
                  className={`button ${currentUser ? "disabled" : ""}`}
                  onClick={() => {
                    if (currentUser) {
                      alert("You already have an account!");
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/regist"
                  className={`button ${currentUser ? "disabled" : ""}`}
                  onClick={() => {
                    if (currentUser) {
                      alert("You already have an account!");
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                >
                  Regist
                </Link>
              </li>
              <li>
                <Link
                  to="/user"
                  className={`account ${!currentUser ? "disabled" : ""}`}
                  onClick={() => {
                    if (!currentUser) {
                      alert("Please log in or register to access the user page.");
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                >
                  {<p> Account: {currentUser?.displayName}</p>}
                </Link>
              </li>
            </div>
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
};

