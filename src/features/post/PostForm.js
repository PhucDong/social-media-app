import { Box, Card, Stack, alpha } from "@mui/material";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FTextField from "../../components/form/FTextField";
import { LoadingButton } from "@mui/lab";
import FormProvider from "../../components/form/FormProvider";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "./postSlice";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required."),
});

const defaultValues = {
  content: "",
  image: "",
  isSubmitting: false,
};

function PostForm() {
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

  const dispatch = useDispatch();
  const isSubmitting = watch("isSubmitting");

  const onSubmit = (data) => {
    setValue("isSubmitting", true);
    dispatch(createPost(data)).then(() => reset());
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            placeholder="What are your thoughts?"
            sx={{
              "& fieldset": {
                borderWidth: "1px !important",
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />

          <FTextField name="image" placeholder="Image" />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting}
            >
              Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostForm;
