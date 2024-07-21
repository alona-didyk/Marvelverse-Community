import { Link } from "react-router-dom";

import firstimg from "../../../assets/images/firstimg.jpeg";
import toroid from "../../../assets/icons/toroid.svg";
import toroid2 from "../../../assets/icons/toroid2.svg";

export const Banner = () => {
  return (
    <section className="hero">
      <div className="hero__wrapper">
        <div className="hero__text-wrapper">
          <h1 className="hero__title">Marvelverse Community</h1>
          <p className="hero__subtitle">
            Entering into Marvelverse Community. Dive into the extraordinary
            world of Marvel superheroes and immerse yourself in thrilling
            adventures..
          </p>
          <Link className="button" to="/regist">
            Join Us Now
          </Link>
        </div>
        <div className="hero__img-wrapper">
          <div className="toroid">
            <img className="toroid1" src={toroid} alt="toroid" />
            <img className="toroid2" src={toroid2} alt="toroid" />
          </div>
          <div className="hero__img">
            <img src={firstimg} alt="img" />
          </div>
        </div>
      </div>
    </section>
  );
};
