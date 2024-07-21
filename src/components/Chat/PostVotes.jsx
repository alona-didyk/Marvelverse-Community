// PostForm.js
import React from "react";

export const PostForm = ({ newPost, handleInputChange, handleAddPost }) => {
  return (
    <div className="form">
      <div className="form__wrapper">
        <form onSubmit={handleAddPost}>
          <h2 className="form__title">Add Post</h2>
          <p className="form__subtitle">
            Enter the title and body of your post
          </p>
          <div className="discuss__inputs">
            <div>
              <input
                className="discuss__input"
                placeholder="Add title"
                type="text"
                name="title"
                id="title"
                value={newPost.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <textarea
                className="discuss__input"
                placeholder="Share your thoughts"
                name="body"
                id="body"
                value={newPost.body}
                onChange={handleInputChange}
              />
            </div>
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};




