import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import md5 from "md5";
import { AuthContext } from "../../context/AuthContext";
import Swiper3 from "../../assets/images/comics.jpeg";
import toroid from "../../assets/icons/toroid.svg";
import toroid2 from "../../assets/icons/toroid2.svg";
import "../Movie/Movie.scss";
import { Discuss } from "../Movie/MovieItems/Discuss";

export const Comic = () => {
  const publicKey = "c3f632bec30eb93b2dd9e59bf1f57195";
  const privateKey = "3cf625245a2565f7a938cb534b8b791db6a31ba8";
  const timestamp = Date.now().toString();
  const hash = md5(timestamp + privateKey + publicKey);

  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [comics, setComics] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchComics = () => {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/comics?&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        )
        .then((response) => {
          const data = response.data;
          if (
            data &&
            data.data &&
            data.data.results &&
            data.data.results.length > 0
          ) {
            setComics(data.data.results);
            setError(null);
          } else {
            setComics([]);
            setError("No Marvel comics found.");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error", error);
          setComics([]);
          setError("An error occurred while fetching Marvel comics.");
          setLoading(false);
        });
    };
    fetchComics();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [comics]);

  const addToFavorites = (comic) => {
    if (currentUser) {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const isAlreadyAdded = storedFavorites.some(
        (item) => item.id === comic.id
      );
      if (isAlreadyAdded) {
        alert("Movie is already in favorites.");
        return;
      }
      const updatedFavorites = [...storedFavorites, comic];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert("Movie added to favorites.");
    } else {
      alert("Please log in to add a movie to favorites.");
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      alert("Please enter a comic title to search.");
      return;
    }
    setLoading(true);
    axios
      .get(
        `https://gateway.marvel.com/v1/public/comics?title=${encodeURIComponent(
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
          setComics(data.data.results);
          setError(null);
        } else {
          setComics([]);
          setError("No Marvel comics found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error", error);
        setComics([]);
        setError("An error occurred while searching for Marvel comics.");
        setLoading(false);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastComic = currentPage * itemsPerPage;
  const indexOfFirstComic = indexOfLastComic - itemsPerPage;
  const currentComics = comics.slice(indexOfFirstComic, indexOfLastComic);

  const totalPages = Math.ceil(comics.length / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <main className="main">
      <div className="main__wrapper">
        <section className="hero">
          <div className="hero__wrapper">
            <div className="hero__text-wrapper">
              <h1 className="hero__title">COMICS</h1>
              <p className="hero__subtitle">
                Journey into the comic universe of Marvel!
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
              <h2 className="search__title">Search Comics</h2>
              <p className="search__subtitle">
                Enter a comic title to search for specific comics.
              </p>
            </div>

            <div className="search__form-wrapper">
              <form className="search__form" onSubmit={handleSearch}>
                <input
                  className="search__input"
                  type="text"
                  placeholder="Search comics..."
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
                  currentComics.map((comic) => (
                    <div key={comic.id} className="movies__border">
                      <div className="movies__img-wrapper">
                        <img
                          className="movies__img"
                          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                          alt={comic.title}
                        />
                      </div>
                      <div className="movies__text-wrapper">
                        <h3 className="movies__title">{comic.title}</h3>
                        <p className="movies__subtitle">{comic.description}</p>
                        <div className="buttons">
                          <Link
                            to={`/comicsdetails/${comic.id}`}
                            className="button"
                          >
                            View More
                          </Link>
                          <button
                            className="button"
                            onClick={() => addToFavorites(comic)}
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
            <div className="movies__pagination">
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`movies__pagination--button ${
                    pageNumber === currentPage ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Discuss />
      </div>
    </main>
  );
};
