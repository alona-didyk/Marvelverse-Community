import React, { useEffect, useState } from "react";
import "./Chat.scss";
import { Hero } from "./HeroChat";
import { PostForm } from "./PostVotes";
import { PostList } from "./PostList";
import PostComments from "./PostComments";

export const Chat = () => {
  const [apiPosts, setApiPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [localPosts, setLocalPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [visibleComments, setVisibleComments] = useState(5);

  useEffect(() => {
    fetchApiPosts();
    loadLocalPosts();
  }, []);

  const fetchApiPosts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/posts");
      const data = await response.json();
      setApiPosts(data.posts);
    } catch (error) {
      console.error("Error fetching API posts:", error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/comments?postId=${postId}`
      );
      const data = await response.json();
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: data.comments,
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const loadLocalPosts = () => {
    const savedPosts = localStorage.getItem("localPosts");
    if (savedPosts) {
      setLocalPosts(JSON.parse(savedPosts));
    }
  };

  const saveLocalPosts = (posts) => {
    localStorage.setItem("localPosts", JSON.stringify(posts));
  };

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleAddPost = (e) => {
    e.preventDefault();

    if (newPost.title.trim() === "" || newPost.body.trim() === "") {
      alert("Please enter both the title and body of your post.");
      return;
    }
  
    const createdPost = { ...newPost, id: Date.now(), comments: [] };
    const updatedPosts = [createdPost, ...localPosts];
    setLocalPosts(updatedPosts);
    saveLocalPosts(updatedPosts);
    setNewPost({ title: "", body: "" });
  };

  const handleShowMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
  };

  const handleShowLessPosts = () => {
    setVisiblePosts((prevVisiblePosts) => Math.max(prevVisiblePosts - 5, 5));
  };

  const handleCloseComments = (postId) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: undefined,
    }));
    setVisibleComments(5);
  };

  const handleShowMoreComments = (postId) => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 5);
  };

  return (
    <div className="discuss">
      <div className="discuss__wrapper">
        <Hero />
        <PostForm
          newPost={newPost}
          handleInputChange={handleInputChange}
          handleAddPost={handleAddPost}
        />

        <PostList
          localPosts={localPosts}
          apiPosts={apiPosts}
          visiblePosts={visiblePosts}
          visibleComments={visibleComments}
          comments={comments}
          fetchComments={fetchComments}
          handleShowMorePosts={handleShowMorePosts}
          handleShowLessPosts={handleShowLessPosts}
          handleCloseComments={handleCloseComments}
          handleShowMoreComments={handleShowMoreComments}
        />

        {Object.keys(comments).map((postId) => (
          <PostComments
            key={postId}
            postId={postId}
            comments={comments}
            visibleComments={visibleComments}
            handleShowMoreComments={handleShowMoreComments}
            handleCloseComments={handleCloseComments}
            setVisibleComments={setVisibleComments}
          />
        ))}
      </div>
    </div>
  );
};
