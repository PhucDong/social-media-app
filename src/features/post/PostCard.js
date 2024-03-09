import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";

function PostCard({ post }) {
  const [anchorPostMenu, setAnchorPostMenu] = useState(null);
  const dispatch = useDispatch();

  const handlePostMenuClose = () => {
    setAnchorPostMenu(null);
  };

  const handleDeletePost = (postId) => {
    setAnchorPostMenu(null);
    dispatch(deletePost(postId));
  };

  const handlePostMenuOpen = (event) => {
    setAnchorPostMenu(event.currentTarget);
  };

  const postOptionsMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorPostMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorPostMenu)}
      onClose={handlePostMenuClose}
    >
      <MenuItem
        onClick={handlePostMenuClose}
        to="/"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Edit Post
      </MenuItem>
      <MenuItem
        onClick={() => handleDeletePost(post._id)}
        to="/"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Delete Post
      </MenuItem>
    </Menu>
  );

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            // to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <IconButton onClick={handlePostMenuOpen}>
            <MoreVertIcon sx={{ fontSize: 30 }} />
          </IconButton>
        }
      />
      {postOptionsMenu}

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>
        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: "100%",
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}
        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
