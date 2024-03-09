import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./postSlice";
import PostCard from "./PostCard";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";

function PostList({ userId }) {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { postsById, currentPagePosts, totalPosts, isLoading, deletedPost } =
    useSelector((state) => state.post);
  const posts = currentPagePosts.map((postId) => postsById[postId]);

  useEffect(() => {
    if (userId) {
      dispatch(getPosts({ userId, page }));
    }
    console.log(21, "Posts are rendered");
  }, [dispatch, userId, page]);

  useEffect(() => {
    if (deletedPost) {
      dispatch(getPosts({ userId, page }));
    }
  }, [deletedPost, dispatch, userId, page]);

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      {totalPosts ? (
        <LoadingButton
          variant="outlined"
          size="small"
          loading={isLoading}
          onClick={() => setPage((page) => page + 1)}
        >
          Load more
        </LoadingButton>
      ) : (
        <Typography variant="h6">No posts yet</Typography>
      )}
    </>
  );
}

export default PostList;
