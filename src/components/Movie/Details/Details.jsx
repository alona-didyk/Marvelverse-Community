import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import { useParams } from "react-router-dom";
import "./Details.scss";
import { Comments } from "./Comments2/Comments";

export const MoviesDetails = () => {
  const publicKey = "c3f632bec30eb93b2dd9e59bf1f57195";
  const privateKey = "3cf625245a2565f7a938cb534b8b791db6a31ba8";
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const timestamp = Date.now().toString();
        const hash = md5(timestamp + privateKey + publicKey);

        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/series/${id}?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        );
        setSeries(response.data.data.results[0]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSeriesDetails();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!series) {
    return <p>Loading...</p>;
  }

  const redirectToMarvelWebsite = () => {
    window.location.href = "https://www.marvel.com";
  };

  return (
    <div className="details">
      <div className="details__wrapper">
        <div className="details__info">
          <h2 className="details__title">{series.title}</h2>

          <p className="details__rating">Rating: {series.rating}</p>
          <p className="details__subtitle">Description: {series.description}</p>
          <button className="details__button" onClick={redirectToMarvelWebsite}>
            Visit Official Marvel Website
          </button>
        </div>
        <div className="details__images">
          <img
            className="details__img"
            src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
            alt={series.title}
          />
        </div>
      </div>
      <Comments />
    </div>
  );
};
