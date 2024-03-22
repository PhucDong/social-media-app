import {
  Box,
  Card,
  Grid,
  Pagination,
  Stack,
  Typography,
  Container,
} from "@mui/material";
import SearchInput from "../../components/SearchInput";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { getSentFriendRequests } from "./friendSlice";

function SentFriendRequests() {
  const [filterSentRequest, setFilterSentRequest] = useState("");
  const [sentRequestPage, setSentRequestPage] = useState(1);

  const { currentPageUsers, usersById, totalUsers, totalPages } = useSelector(
    (state) => state.friend
  );
  const sentFriendRequests = currentPageUsers.map(
    (targetUserId) => usersById[targetUserId]
  );
  const dispatch = useDispatch();
  console.log(32, sentFriendRequests);

  const handleSubmit = (searchQuery) => {
    setFilterSentRequest(searchQuery);
  };

  useEffect(() => {
    dispatch(getSentFriendRequests(filterSentRequest, sentRequestPage));
  }, [dispatch, filterSentRequest, sentRequestPage]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Sent Friend Requests
      </Typography>

      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />

            <Box sx={{ flexGrow: 1 }} />

            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} requests found`
                : totalUsers === 1
                ? `${totalUsers} request found`
                : "No request found"}
            </Typography>

            <Pagination
              count={totalPages}
              page={sentRequestPage}
              onChange={(e, page) => setSentRequestPage(page)}
            />
          </Stack>
        </Stack>

        <Grid container spacing={3} my={1}>
          {sentFriendRequests.map((sentRequest) => (
            <Grid key={sentRequest._id} item xs={12} md={4}>
              <UserCard profile={sentRequest} />
            </Grid>
          ))}
        </Grid>
      </Card>
      {/* Need an array of sent requests to map out */}
    </Container>
  );
}

export default SentFriendRequests;
