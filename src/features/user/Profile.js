import { Grid, Stack } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import ProfileScorecard from "./ProfileScorecard";
import ProfileAbout from "./ProfileAbout";
import ProfileSocialInfo from "./ProfileSocialInfo";
import PostForm from "../post/PostForm";
import PostList from "../post/PostList";

function Profile({ profile }) {
  const { user } = useAuth();

  return (
    <Grid container spacing={3}>
      {/* This grid item contains the information in the left column */}
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileScorecard profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileSocialInfo profile={profile} />
        </Stack>
      </Grid>

      {/* This section lets users to create posts & post them 
      When other users access someone's profile,
        They neither create posts nor switch between tabs 
        They only see that person's posts and the information in the left column */}
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {user._id === profile._id && <PostForm />}

          {/* Pass userId prop for accessing to other profiles' info in the future */}
          <PostList userId={profile._id} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Profile;
