import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import Profile from "../features/user/Profile";
import FriendList from "../features/friend/FriendList";
import IncomingFriendRequests from "../features/friend/IncomingFriendRequests";
import AddFriend from "../features/friend/AddFriend";
import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import ProfileCover from "../features/user/ProfileCover";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import SentFriendRequests from "../features/friend/SentFriendRequests";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: "#fff",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

function HomePage() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("profile");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <AccountBoxIcon sx={{ fontSize: 20 }} />,
      component: <Profile profile={user} />,
    },
    {
      value: "friends",
      icon: <PeopleAltIcon sx={{ fontSize: 20 }} />,
      component: <FriendList />,
    },
    {
      value: "sent requests",
      icon: <SendIcon sx={{ fontSize: 20 }} />,
      component: <SentFriendRequests />,
    },
    {
      value: "incoming requests",
      icon: <ContactMailIcon sx={{ fontSize: 20 }} />,
      component: <IncomingFriendRequests />,
    },
    {
      value: "add_friend",
      icon: <PersonAddRoundedIcon sx={{ fontSize: 20 }} />,
      component: <AddFriend />,
    },
  ];

  return (
    <Container>
      <Card sx={{ mb: 3, height: 280, position: "relative" }}>
        <ProfileCover profile={user} />

        <TabsWrapperStyle>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
          >
            {PROFILE_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={capitalCase(tab.value)}
              />
            ))}
          </Tabs>
        </TabsWrapperStyle>
      </Card>

      {/* Displaying sections that associate with each tab */}
      {PROFILE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default HomePage;
