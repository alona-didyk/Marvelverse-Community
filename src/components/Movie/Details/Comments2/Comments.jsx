import React, { useState, useEffect } from "react";
import "./styles/Comments.scss";
import { Comment } from "./Comment";
import { AddComment } from "./AddComment";

export const Comments = () => {
  const [comments, updateComments] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(process.env.PUBLIC_URL + "/data/data.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      updateComments(data.comments);
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      updateComments(JSON.parse(storedComments));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
    if (deleteModalState) {
      document.body.classList.add("overflow--hidden");
    } else {
      document.body.classList.remove("overflow--hidden");
    }
  }, [comments, deleteModalState]);

  // useEffect(() => {
  //   if (localStorage.getItem("comments")) {
  //     updateComments(JSON.parse(localStorage.getItem("comments")));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("comments", JSON.stringify(comments));
  //   deleteModalState
  //     ? document.body.classList.add("overflow--hidden")
  //     : document.body.classList.remove("overflow--hidden");
  // }, [comments, deleteModalState]);

  // update score
  let updateScore = (score, id, type) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.score = score;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((data) => {
          if (data.id === id) {
            data.score = score;
          }
        });
      });
    }
    updateComments(updatedComments);
  };

  // add comments
  let addComments = (newComment) => {
    let updatedComments = [...comments, newComment];
    updateComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  // add replies
  let updateReplies = (replies, id) => {
    let updatedComments = [...comments];
    updatedComments.forEach((data) => {
      if (data.id === id) {
        data.replies = [...replies];
      }
    });
    updateComments(updatedComments);
  };

  // edit comment
  let editComment = (content, id, type) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.content = content;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((data) => {
          if (data.id === id) {
            data.content = content;
          }
        });
      });
    }

    updateComments(updatedComments);
  };

  // delete comment
  let commentDelete = (id, type, parentComment) => {
    let updatedComments = [...comments];
    let updatedReplies = [];

    if (type === "comment") {
      updatedComments = updatedComments.filter((data) => data.id !== id);
    } else if (type === "reply") {
      comments.forEach((comment) => {
        if (comment.id === parentComment) {
          updatedReplies = comment.replies.filter((data) => data.id !== id);
          comment.replies = updatedReplies;
        }
      });
    }

    updateComments(updatedComments);
  };

  return (
    <main className="Comments">
      <h2 className="Comments__title">Comments</h2>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          commentData={comment}
          updateScore={updateScore}
          updateReplies={updateReplies}
          editComment={editComment}
          commentDelete={commentDelete}
          setDeleteModalState={setDeleteModalState}
        />
      ))}
      <AddComment buttonValue={"send"} addComments={addComments} />
    </main>
  );
};
