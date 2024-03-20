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
import PostEdit from "./PostEdit";
import DeletePostConfirmation from "./DeletePostConfirmation";

function PostCard({ post }) {
  const [anchorPostMenu, setAnchorPostMenu] = useState(null);
  const [openPostEdit, setOpenPostEdit] = useState(false);
  const [openDelPostConfirm, setOpenDelPostConfirm] = useState(false);

  const handlePostMenuClose = () => {
    setAnchorPostMenu(null);
  };

  const handlePostMenuOpen = (event) => {
    setAnchorPostMenu(event.currentTarget);
  };

  const handleOpenPostEdit = () => {
    setOpenPostEdit(true);
    setAnchorPostMenu(null);
  };

  const handleClosePostEdit = () => {
    setOpenPostEdit(false);
  };

  const handleOpenDelPostConfirm = () => {
    setOpenDelPostConfirm(true);
    setAnchorPostMenu(null);
  };

  const handleCloseDelPostConfirm = () => {
    setOpenDelPostConfirm(false);
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
      <MenuItem onClick={handleOpenPostEdit} sx={{ mx: 1 }}>
        Edit Post
      </MenuItem>
      <PostEdit
        post={post}
        openPostEdit={openPostEdit}
        handleClosePostEdit={handleClosePostEdit}
      />
      <MenuItem
        onClick={handleOpenDelPostConfirm}
        sx={{ mx: 1 }}
      >
        Delete Post
      </MenuItem>
      <DeletePostConfirmation
        post={post}
        openDelPostConfirm={openDelPostConfirm}
        handleCloseDelPostConfirm={handleCloseDelPostConfirm}
      />
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
