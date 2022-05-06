import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPosts,
  selectError,
  selectStatus,
  fetchPosts,
} from "../features/posts/postSlice";
import Post from "./Post";

function Posts() {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const postStatus = useSelector(selectStatus);
  const postError = useSelector(selectError);

  // fetch posts on mount
  useEffect(() => {
    if (postStatus === "idle") {
      // fetch only once
      console.log("idle");
      dispatch(fetchPosts());
    }
  }, [dispatch, postStatus]);
  console.log(posts.length);

  let content;
  if (postStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (postStatus === "success") {
    // sort posts by createdAt in descending order
    const sortedPosts = posts.slice().sort((a, b) => {
      return b.date.localeCompare(a.date);
    });
    console.log(sortedPosts.length);
    content = sortedPosts.map((post) => {
      return (
        <div key={post.idd} className="pt-4 px-10">
          <Post {...post} />
        </div>
      );
    });
  } else if (postStatus === "error") {
    content = <div>{postError}</div>;
  }
  return <div>{content}</div>;
}

export default Posts;
