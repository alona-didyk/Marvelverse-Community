import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import { useParams } from "react-router-dom";
import "../../Movie/Details/Details.scss";
import { Comments } from "../../Movie/Details/Comments2/Comments";

export const ComicsDetails = () => {
  const publicKey = "c3f632bec30eb93b2dd9e59bf1f57195";
  const privateKey = "3cf625245a2565f7a938cb534b8b791db6a31ba8";
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComicDetails = async () => {
      try {
        const timestamp = Date.now().toString();
        const hash = md5(timestamp + privateKey + publicKey);

        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/comics/${id}?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        );
        setComic(response.data.data.results[0]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchComicDetails();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!comic) {
    return <p>Loading...</p>;
  }

  const redirectToMarvelWebsite = () => {
    window.location.href = "https://www.marvel.com";
  };

  return (
    <div className="details">
      <div className="details__wrapper">
        <div className="details__info">
          <h2 className="details__title">{comic.title}</h2>
          <p className="details__subtitle">Issue Number: {comic.issueNumber}</p>
          <button className="details__button" onClick={redirectToMarvelWebsite}>
            Visit Official Marvel Website
          </button>
        </div>
        <div className="details__images">
          <img
            className="details__img"
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
          />
        </div>
      </div>
      <Comments />
    </div>
  );
};
