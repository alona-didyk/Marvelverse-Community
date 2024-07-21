import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import md5 from "md5";
import Swiper3 from "../../assets/images/swiper3.jpeg";
import toroid from "../../assets/icons/toroid.svg";
import toroid2 from "../../assets/icons/toroid2.svg";
import "./Movie.scss";
import { Discuss } from "./MovieItems/Discuss";
import { AuthContext } from "../../context/AuthContext";

export const Movie = () => {
  const publicKey = "c3f632bec30eb93b2dd9e59bf1f57195";
  const privateKey = "3cf625245a2565f7a938cb534b8b791db6a31ba8";
  const timestamp = Date.now().toString();
  const hash = md5(timestamp + privateKey + publicKey);

  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMovies = () => {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/series?title=Avengers&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        )
        .then((response) => {
          const data = response.data;
          if (
            data &&
            data.data &&
            data.data.results &&
            data.data.results.length > 0
          ) {
            setMovies(data.data.results);
            setError(null);
          } else {
            setMovies([]);
            setError("No Marvel movies found.");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error", error);
          setMovies([]);
          setError("An error occurred while fetching Marvel movies.");
          setLoading(false);
        });
    };

    fetchMovies();
  }, []);

  const addToFavorites = (movie) => {
    if (currentUser) {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const isAlreadyAdded = storedFavorites.some(
        (item) => item.id === movie.id
      );
      if (isAlreadyAdded) {
        alert("Movie is already in favorites.");
        return;
      }
      const updatedFavorites = [...storedFavorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert("Movie added to favorites.");
    } else {
      alert("Please log in to add a movie to favorites.");
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      alert("Please enter a movie title to search.");
      return;
    }
    setLoading(true);
    axios
      .get(
        `https://gateway.marvel.com/v1/public/series?title=${encodeURIComponent(
          searchTerm
        )}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
      )
      .then((response) => {
        const data = response.data;
        if (
          data &&
          data.data &&
          data.data.results &&
          data.data.results.length > 0
        ) {
          setMovies(data.data.results);
          setError(null);
        } else {
          setMovies([]);
          setError("No Marvel movies found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error", error);
        setMovies([]);
        setError("An error occurred while searching for Marvel movies.");
        setLoading(false);
      });
  };

  return (
    <main className="main">
      <div className="main__wrapper">
        <section className="hero">
          <div className="hero__wrapper">
            <div className="hero__text-wrapper">
              <h1 className="hero__title">MOVIES</h1>
              <p className="hero__subtitle">
                Journey into the cosmic depths of the mighty Marvel Cinematic
                Universe!
              </p>
              <Link className="button" to="/chat">
                Discuss
              </Link>
            </div>
            <div className="hero__img-wrapper">
              <div className="toroid">
                <img className="toroid1" src={toroid} alt="toroid" />
                <img className="toroid2" src={toroid2} alt="toroid" />
              </div>
              <div className="hero__img">
                <img src={Swiper3} alt="img" />
              </div>
            </div>
          </div>
        </section>
        <section className="search">
          <div className="search__wrapper">
            <div className="search__text-wrapper">
              <h2 className="search__title">Search Movies</h2>
              <p className="search__subtitle">
                Enter a movie title to search for specific movies.
              </p>
            </div>

            <div className="search__form-wrapper">
              <form className="search__form" onSubmit={handleSearch}>
                <input
                  className="search__input"
                  type="text"
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="button" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </section>

        <div className="movies">
          <div className="movies__wrapper">
            {loading ? (
              <div className="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <>
                {error ? (
                  <p>{error}</p>
                ) : (
                  movies.map((movie) => (
                    <div key={movie.id} className="movies__border">
                      <div className="movies__img-wrapper">
                        <img
                          className="movies__img"
                          src={`${movie.thumbnail.path}.${movie.thumbnail.extension}`}
                          alt={movie.title}
                        />
                      </div>
                      <div className="movies__text-wrapper">
                        <h3 className="movies__title">{movie.title}</h3>
                        <p className="movies__title2">
                          Start Year: {movie.startYear}
                        </p>
                        <p className="movies__subtitle">{movie.description}</p>
                        <div className="buttons">
                          <Link to={`/details/${movie.id}`} className="button">
                            View More
                          </Link>
                          <button
                            className="button"
                            onClick={() => addToFavorites(movie)}
                          >
                            Add to Favorite
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
        <Discuss />
      </div>
    </main>
  );
};
