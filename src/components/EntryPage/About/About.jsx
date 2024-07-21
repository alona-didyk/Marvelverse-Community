import { Link } from "react-router-dom";

export const About = () => {
  return (
    <section className="about">
      <div className="about__wrapper">
        <h2 className="about__title">About Us</h2>
        <div className="about__inline">
          <h3 className="about__subtitle">WHAT IS Marvelverse Community?</h3>
          <Link className="button" to="/login">
            Log In Now
          </Link>
        </div>

        <p className="about__subtitle-p">
          Whether you're a die-hard fan or just discovering the Marvel Universe,
          our platform offers a unique and immersive experience that will
          captivate and entertain you. Join us as we celebrate the iconic
          characters, epic stories, and rich history of Marvel through movies,
          TV shows, comic books, and interactive features. Get ready to unleash
          your inner superhero!
        </p>
        <hr />
      </div>
    </section>
  );
};
