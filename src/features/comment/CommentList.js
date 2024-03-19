import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getComments } from "./commentSlice";
import { COMMENT_PER_POST } from "../../app/config";
import { Pagination, Stack, Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import LoadingScreen from "../../components/LoadingScreen";

function CommentList({ postId }) {
  const {
    commentsByPost,
    commentsById,
    totalComments,
    isLoading,
    currentPage,
    deletedComment,
  } = useSelector(
    (state) => ({
      commentsByPost: state.comment.commentsByPost[postId],
      totalComments: state.comment.totalCommentsByPost[postId],
      currentPage: state.comment.currentPageByPost[postId],
      commentsById: state.comment.commentsById,
      isLoading: state.comment.isLoading,
      deletedComment: state.comment.deletedComment,
    }),
    shallowEqual
  );
  const totalPages = Math.ceil(totalComments / COMMENT_PER_POST);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postId) {
      dispatch(getComments({ postId }));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (deletedComment) {
      dispatch(getComments({ postId }));
    }
  }, [dispatch, deletedComment, postId]);

  let renderedComments;
  if (commentsByPost) {
    const comments = commentsByPost.map((commentId) => commentsById[commentId]);
    renderedComments = (
      <Stack spacing={1.5}>
        {comments.map((comment) => (
          <CommentCard key={comment?._id} comment={comment} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderedComments = <LoadingScreen />;
  }

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
          {totalComments > 1
            ? `${totalComments} comments`
            : totalComments === 1
            ? `${totalComments} comment`
            : "No comment"}
        </Typography>
        {totalComments > COMMENT_PER_POST && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => dispatch(getComments({ postId, page }))}
          />
        )}
      </Stack>
      {renderedComments}
    </Stack>
  );
}

export default CommentList;