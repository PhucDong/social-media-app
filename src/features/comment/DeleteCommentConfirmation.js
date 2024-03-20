import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { customStyledCard } from "../post/customStyledCard";
import { deleteComment } from "./commentSlice";

function DeleteCommentConfirmation({
  comment,
  openDelCommentConfirm,
  handleCloseDelCommentConfirm,
}) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.comment.isLoading);

  const handleDeleteComment = () => {
    dispatch(deleteComment(comment._id));
  };

  return (
    <Modal open={openDelCommentConfirm}>
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
          <Typography variant="h4">Delete comment?</Typography>
          <Typography>Are you sure you want to delete this comment?</Typography>
        </Box>

        <Box>
          <LoadingButton
            type="submit"
            variant="contained"
            size="small"
            loading={isLoading}
            onClick={handleDeleteComment}
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
            onClick={handleCloseDelCommentConfirm}
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

export default DeleteCommentConfirmation;
