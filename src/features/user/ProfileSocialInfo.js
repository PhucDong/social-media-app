import { Card, CardHeader, Stack, Link } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import IconStyle from "./IconStyle";

function ProfileSocialInfo({ profile }) {
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;

  const SOCIALS = [
    {
      name: "Linkedin",
      icon: (
        <IconStyle color="#006097">
          <LinkedInIcon />
        </IconStyle>
      ),
      href: linkedinLink,
    },
    {
      name: "Twitter",
      icon: (
        <IconStyle color="#1877F2">
          <TwitterIcon />
        </IconStyle>
      ),
      href: twitterLink,
    },
    {
      name: "Facebook",
      icon: (
        <IconStyle color="#1C9CEA">
          <FacebookIcon />
        </IconStyle>
      ),
      href: facebookLink,
    },
    {
      name: "Instagram",
      icon: (
        <IconStyle color="#D7336D">
          <InstagramIcon />
        </IconStyle>
      ),
      href: instagramLink,
    },
  ];

  return (
    <Card>
      <CardHeader title="Social" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {SOCIALS.map((link) => (
          <Stack key={link.name} direction="row" alignItems="center">
            {link.icon}
            <Link
              href={`https://${link.href}`}
              target="_blank"
              variant="body2"
              color="text.primary"
              noWrap
            >
              {link.href}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

export default ProfileSocialInfo;
