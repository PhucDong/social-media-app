import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Container,
  IconButton,
  Modal,
  Typography,
  alpha,
} from "@mui/material";
import { FTextField, FUploadImage, FormProvider } from "../../components/form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { fDate } from "../../utils/formatTime";
import { LoadingButton } from "@mui/lab";

const customStyledCard = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  maxWidth: "540px",
  backgroundColor: "white",
};

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required."),
});

const defaultValues = {
  content: "",
  image: "",
  isSubmitting: false,
};

function PostEdit({ post, openPostEdit, handleClosePostEdit }) {
  const [postEditContent, setPostEditContent] = useState(post.content);

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    // formState: { isSubmitting },
  } = methods;

  const isSubmitting = watch("isSubmitting");

  const onSubmit = (data) => {
    setValue("isSubmitting", true);
    console.log(61, data);
  };

  const handleChangePostEditContent = (event) => {
    setPostEditContent(event.target.value);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Modal open={openPostEdit}>
      <Card sx={customStyledCard}>
        <CardHeader
          avatar={
            <Avatar
              src={post?.author?.avatarUrl}
              alt={post?.author?.name}
              sx={{ width: 50, height: 50 }}
            />
          }
          title={
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
              {post?.author?.name}
            </Typography>
          }
          subheader={
            <Typography
              variant="caption"
              sx={{ display: "block", color: "text.secondary", fontSize: 14 }}
            >
              {fDate(post.updatedAt)}
            </Typography>
          }
          action={
            <IconButton onClick={handleClosePostEdit}>
              <CloseIcon sx={{ fontSize: 34 }} />
            </IconButton>
          }
        />
        <Container spacing={2} sx={{ p: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <FTextField
              name="content"
              multiline
              fullWidth
              value={postEditContent}
              onChange={handleChangePostEditContent}
              postContent={postEditContent}
              sx={{
                marginBottom: "10px",
                "& fieldset": {
                  height: "100%",
                  borderWidth: "1px !important",
                  borderColor: alpha("#919EAB", 0.32),
                },
              }}
            />

            {post.image ? (
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  height: "100%",
                  position: "relative",
                  "& img": { objectFit: "cover", width: 1, height: 1 },
                }}
              >
                <img src={post.image} alt="post" />
                <IconButton
                  onClick={handleClosePostEdit}
                  sx={{ position: "absolute", top: 0, right: 0 }}
                >
                  <CloseIcon sx={{ fontSize: 26 }} />
                </IconButton>
              </Box>
            ) : (
              <FUploadImage
                name="image"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
              />
            )}

            <Box sx={{ marginTop: "14px" }}>
              <LoadingButton
                type="submit"
                variant="contained"
                size="small"
                loading={isSubmitting}
                sx={{
                  width: "100%",
                  padding: "6px",
                  textTransform: "capitalize",
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                Save
              </LoadingButton>
            </Box>
          </FormProvider>
        </Container>
      </Card>
    </Modal>
  );
}

export default PostEdit;
