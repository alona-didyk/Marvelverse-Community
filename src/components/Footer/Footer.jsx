import { Link } from "react-router-dom";

import facebook from "../../assets/icons/facebook.svg";
import twitter from "../../assets/icons/twitter.svg";
import instagram from "../../assets/icons/instagram.svg";

import "./Footer.scss";

const SOCIAL_MEDIA = [
  {
    platform: "Facebook",
    url: "https://www.facebook.com/marvelverse",
    icon: facebook,
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/marvelverse",
    icon: instagram,
  },
  {
    platform: "Twitter",
    url: "https://www.twitter.com/marvelverse",
    icon: twitter,
  },
];

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__wrapper">
          <div className="footer__text">
            <h3 className="footer__title">Let’s Connect</h3>
            <h2 className="footer__subtitle">STAY IN TOUCH WITH US!</h2>
          </div>
          <div className="footer__content">
            <div className="footer__content--left">
              <p>Marvelverse Technologies</p>
              <a
                href="https://maps.google.com/?q=AB7/846-124, Dubai, UAE."
                target="_blank"
                rel="noopener noreferrer"
              >
                AB7/846-124, Dubai, UAE.
              </a>
              <a href="tel:+917415875215">+91 741 587 5215</a>
              <a href="mailto:info@marvelverse.space">info@marvelverse.space</a>
            </div>
            <div className="footer__content--right">
              <ul className="footer__social-icons">
                {SOCIAL_MEDIA.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={item.icon} alt={`${item.platform} icon`} />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="footer__buttons">
                <Link className="button" to="/login">
                  Sign In
                </Link>
                <Link className="button" to="/regist">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
          <div className="footer__copy">
            <p>Citizen of MARVELVERSE - All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
};
