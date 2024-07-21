import { Link } from "react-router-dom";
import discuss from "../../../assets/images/discuss2.jpeg";

export const Discuss = () => {
  return (
    <>
      <section className="discuss">
        <div className="discuss__wrapper">
          <div className="discuss__text--wrapper">
            <h2 className="discuss__title">Blog</h2>
            <h1 className="discuss__title2">STAY CONNECTED WITH OUR WORLD.</h1>
            <p className="discuss__subtitle">
              Feel free to share your thoughts, opinions, and engage in
              discussions about your favorite movies. Whether you want to review
              a recent release, recommend a hidden gem, or discuss a classic
              film, this is the place to connect with fellow movie enthusiasts.
            </p>
            <Link className="button" to="/chat">
              Explore More
            </Link>
          </div>
          <div className="discuss__block">
            <div className="discuss__block--wrapper">
              <img className="discuss__img" src={discuss} alt="discuss" />
              <div className="discuss__text">
                <h3 className="discuss__title3">
                  Movie Recommendation: "Inception"
                </h3>
                <p className="discuss__subtitle">
                  Hey everyone. Ayan Bradmani here, CEO of ARxian. I wanted
                  to...
                </p>
                <p className="discuss__more">Read more --&gt;</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
