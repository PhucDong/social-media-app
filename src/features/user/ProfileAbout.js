import { Link, Card, Typography, CardHeader, Stack } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import EmailIcon from "@mui/icons-material/Email";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import IconStyle from "./IconStyle";

function ProfileAbout({ profile }) {
  const { aboutMe, city, country, email, company } = profile;

  return (
    <Card>
      <CardHeader title="About" variant="h6" />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{aboutMe}</Typography>

        <Stack direction="row">
          <IconStyle>
            <PinDropIcon />
          </IconStyle>
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {city} {country}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle>
            <EmailIcon />
          </IconStyle>
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle>
            <BusinessCenterIcon />
          </IconStyle>
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {company}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProfileAbout;
