import React from "react";
import user from "../../assets/images/user.jpg";

 const PostComments = ({
  postId,
  comments,
  visibleComments,
  handleShowMoreComments,
  handleCloseComments,
  setVisibleComments, 
}) => {
  const postComments = comments[postId];

  if (!postComments) {
    return null;
  }

  const handleShowLessComments = () => {
    setVisibleComments(5);
  };

  return (
    <div>
      <hr />
      <ul>
        {postComments.slice(0, visibleComments).map((comment) => (
          <li className="discuss__post--comment" key={comment.id}>
            <div className="discuss__post--info">
              <div className="posts__inline">
                <img className="posts__inline--img" src={user} alt="user" />
                <span className="posts__inline--user">UserName</span>
              </div>
              <h5>{comment.name}</h5>
              <p>{comment.body}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="discuss__post--buttons">
        {visibleComments < postComments.length ? (
          <>
            <button
              className="discuss__post--button button"
              onClick={() => handleShowMoreComments(postId)}
            >
              Show More Comments
            </button>
            <button
              className="discuss__post--button button"
              onClick={() => handleCloseComments(postId)}
            >
              Close Comments
            </button>
          </>
        ) : (
          <button
            className="discuss__post--button button"
            onClick={handleShowLessComments}
          >
            Show Less Comments
          </button>
        )}
      </div>
    </div>
  );
};

export default PostComments;

