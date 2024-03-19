import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";

function CommentCard({ comment }) {
  const [anchorCommentMenu, setAnchorCommentMenu] = useState(null);
  const dispatch = useDispatch();

  const handleCommentMenuClose = () => {
    setAnchorCommentMenu(null);
  };

  const handleCommentMenuOpen = (event) => {
    setAnchorCommentMenu(event.currentTarget);
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
    setAnchorCommentMenu(null);
  };

  const commentOptionsMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorCommentMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(anchorCommentMenu)}
      onClose={handleCommentMenuClose}
    >
      <MenuItem
        sx={{ mx: 1, px: 1, fontSize: "0.9rem", lineHeight: 1.25 }}
        onClick={() => setAnchorCommentMenu(null)}
      >
        Edit Comment
      </MenuItem>
      <MenuItem
        sx={{ mx: 1, px: 1, fontSize: "0.9rem", lineHeight: 1.25 }}
        onClick={() => handleDeleteComment(comment._id)}
      >
        Delete Comment
      </MenuItem>
    </Menu>
  );

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment?.author?.name} src={comment?.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgColor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment?.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {comment && fDate(comment?.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment?.content}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "24px",
          }}
        >
          <IconButton
            disableRipple
            sx={{ padding: 0 }}
            onClick={handleCommentMenuOpen}
          >
            <MoreHorizIcon sx={{ fontSize: 30 }} />
          </IconButton>
          {commentOptionsMenu}
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;