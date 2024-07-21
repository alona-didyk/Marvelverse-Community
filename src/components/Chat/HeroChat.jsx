// Hero.js
import React from "react";
import toroid from "../../assets/icons/toroid.svg";
import toroid2 from "../../assets/icons/toroid2.svg";
import firstimg from "../../assets/images/discuss-img.jpeg";

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__wrapper">
        <div className="hero__text-wrapper">
          <h1 className="hero__title">Marvelverse Community Blog</h1>
          <p className="hero__subtitle">
            Join the conversation and share your thoughts!
          </p>
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
