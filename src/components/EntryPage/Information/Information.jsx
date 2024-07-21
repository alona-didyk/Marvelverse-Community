import movie from "../../../assets/icons/movie.svg";
import book from "../../../assets/icons/book.svg";
import chat from "../../../assets/icons/chat.svg";
import rectangle from "../../../assets/icons/rectangle.svg";

const INFO = [movie, book, chat];

export const Information = () => {
  return (
    <section className="information">
      <div className="information__wrapper">
        <div className="information__wrapper">
          <h2 className="information__title">
            What you can find on the platform
          </h2>
          <p className="information__subtitle">
            Explore an extensive collection of movies and TV shows featuring
            your favorite Marvel superheroes and villains. Immerse yourself in
            thrilling comic book adventures and discover new storylines. Engage
            with a vibrant community of fans through our interactive chat
            feature.
          </p>
        </div>
        <div className="information__rectangles">
          {INFO.map((infoImage, index) => (
            <div className="information__rectangle" key={index}>
              <img className="rect__img" src={rectangle} alt="rectangle" />

              <img
                src={infoImage}
                alt={`Info ${index + 1}`}
                className="information__info-image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
