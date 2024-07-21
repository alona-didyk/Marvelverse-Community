// PostList.js
import React from "react";
import user from "../../assets/images/user.jpg";

export const PostList = ({
  localPosts,
  apiPosts,
  visiblePosts,
  visibleComments,
  comments,
  fetchComments,
  handleShowMorePosts,
  handleShowLessPosts,
  handleCloseComments,
  handleShowMoreComments,
  setVisibleComments
}) => {
  const PostComments = ({ postId }) => {
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

  return (
    <div className="posts">
      <div className="posts__wrapper">
        <h2 className="posts__title">Latest Posts</h2>
        <ul>
          {localPosts.map((post) => (
            <li className="discuss__post" key={post.id}>
              <div className="discuss__post--info">
                <div className="posts__inline">
                  <img
                    className="posts__inline--img"
                    src={user}
                    alt="user"
                  />
                  <span className="posts__inline--user">Juliusomo</span>
                  <span className="posts__inline--you">you</span>
                </div>
                <h3 className="posts__title-small">{post.title}</h3>
                <p className="posts__subtitle">{post.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <ul>
          {apiPosts.slice(0, visiblePosts).map((post) => (
            <li className="discuss__post" key={post.id}>
              <div className="discuss__post--info">
                <div className="posts__inline">
                  <img
                    className="posts__inline--img"
                    src={user}
                    alt="user"
                  />
                  <span className="posts__inline--user">UserName</span>
                </div>
                <h3 className="posts__title-small">{post.title}</h3>
                <p className="posts__subtitle">{post.body}</p>
                <button
                  className="button"
                  onClick={() => fetchComments(post.id)}
                >
                  Show Comments
                </button>
                <PostComments postId={post.id} />
                </div>
            </li>
          ))}
        </ul>
        {visiblePosts < apiPosts.length ? (
          <div className="discuss__button">
            <button className="button" onClick={handleShowMorePosts}>
              Show More
            </button>
            {visiblePosts > 5 && (
              <button className="button" onClick={handleShowLessPosts}>
                Show Less
              </button>
            )}
          </div>
        ) : (
          visiblePosts > 5 && (
            <button className="button" onClick={handleShowLessPosts}>
              Show Less
            </button>
          )
        )}
      </div>
    </div>
  );
};
