import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, Modal, Typography } from "@mui/material";
import { customStyledCard } from "./customStyledCard";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "./postSlice";

function DeletePostConfirmation({
  post,
  openDelPostConfirm,
  handleCloseDelPostConfirm,
}) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.post.isLoading);

  const handleDeletePost = () => {
    dispatch(deletePost(post._id));
    handleCloseDelPostConfirm();
  };

  return (
    <Modal open={openDelPostConfirm}>
      <Card sx={customStyledCard}>
        <Box
          sx={{
            padding: "30px",
            "& .MuiTypography-root": {
              textAlign: "center",
              fontSize: "1.1rem",
            },
            "& .MuiTypography-h4": {
              fontSize: "1.8rem",
              marginBottom: "8px",
            },
          }}
        >
          <Typography variant="h4">Delete post?</Typography>
          <Typography>Are you sure you want to delete this post?</Typography>
        </Box>

        <Box>
          <LoadingButton
            type="submit"
            variant="contained"
            size="small"
            loading={isLoading}
            onClick={handleDeletePost}
            sx={{
              width: "100%",
              padding: "6px",
              textTransform: "capitalize",
              fontWeight: 500,
              fontSize: "1.1rem",
              borderRadius: 0,
              backgroundColor: "#ED4956",
              boxShadow: "none",
              "&.MuiLoadingButton-root:hover": {
                backgroundColor: "#ED4956",
                boxShadow: "none",
              },
            }}
          >
            Delete
          </LoadingButton>
          <Button
            disableRipple
            fullWidth
            onClick={handleCloseDelPostConfirm}
            sx={{
              padding: "10px",
              color: "black",
              textTransform: "capitalize",
              fontSize: "1.1rem",
              "&.MuiButton-root:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Card>
    </Modal>
  );
}

export default DeletePostConfirmation;
