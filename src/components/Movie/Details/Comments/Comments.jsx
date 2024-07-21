import React, { useState, useEffect } from "react";
import axios from "axios";
import { Rating } from "./Rating";

export const Comments = () => {
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState([]);
  const [loadedComments, setLoadedComments] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const commentsData = response.data;
        setComments(commentsData);
        setVisibleComments(commentsData.slice(0, 10));
        setLoadedComments(10);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, []);

  const loadMoreComments = () => {
    const nextLoadedComments = loadedComments + 10;
    setVisibleComments(comments.slice(0, nextLoadedComments));
    setLoadedComments(nextLoadedComments);
  };

  const showLessComments = () => {
    const prevLoadedComments = loadedComments - 10;
    setVisibleComments(comments.slice(0, prevLoadedComments));
    setLoadedComments(prevLoadedComments);
  };

  return (
    <section className="comments">
      <div className="comments__wrapper">
        <h2 className="comments__title">Comments</h2>
        <div className="comments__items">
          {visibleComments.map((comment) => (
            <div className="comments__item" key={comment.id}>
              <div className="comments__container">
                <h3 className="comments__title2">{comment.name}</h3>
                <Rating />
              </div>
              <p className="comments__subtitle">{comment.body}</p>
            </div>
          ))}
          <div className="comments__buttons">
            {loadedComments > 10 && (
              <button className="comments__button" onClick={showLessComments}>
                Show Less
              </button>
            )}
            {loadedComments < comments.length && (
              <button className="comments__button" onClick={loadMoreComments}>
                Load More
              </button>
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
};

