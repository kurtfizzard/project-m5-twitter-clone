import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useCurrentUser } from "./CurrentUserContext";
import TweetDetails from "./TweetDetails";
import { useHistory } from "react-router-dom";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { COLORS } from "./Constants";
import Error from "./Error";

const Profile = () => {
  // const { currentUser, status } = useCurrentUser();
  const [currentProfile, setCurrentProfile] = useState(null);
  const [tweetIds, setTweetIds] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [error, setError] = useState(false);

  const { profileId } = useParams();

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCurrentProfile(res.profile);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [profileId]);

  useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTweetIds(res.tweetIds);
        setTweets(res.tweetsById);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  let history = useHistory();

  function handleClick(id) {
    history.push(`/tweet/${id}`);
  }

  return (
    <>
      {error ? (
        <Error />
      ) : (
        <>
          {tweetIds && tweets && currentProfile ? (
            <Wrapper>
              <Banner src={currentProfile.bannerSrc} />
              <Avatar src={currentProfile.avatarSrc} />
              <ButtonContainer>
                <Follow>Follow</Follow>
              </ButtonContainer>
              <Content>
                <Name>{currentProfile.displayName}</Name>
                <Handle>@{currentProfile.handle}</Handle>
                <Bio>{currentProfile.bio}</Bio>
                <LocationJoined>
                  <Location>
                    <FiMapPin />
                    {currentProfile.location}
                  </Location>
                  <Joined>
                    <FiCalendar />
                    {currentProfile.joined}
                  </Joined>
                </LocationJoined>
                <FollowInfo>
                  <NumFollowers>
                    {currentProfile.numFollowers} Followers
                  </NumFollowers>
                  <NumFollowing>
                    {currentProfile.numFollowing} Following
                  </NumFollowing>
                </FollowInfo>
              </Content>
              <DisplaySelector>
                <DisplayOption>Tweets</DisplayOption>
                <DisplayOption>Media</DisplayOption>
                <DisplayOption>Likes</DisplayOption>
              </DisplaySelector>
              {tweetIds.map((id) => (
                <TweetDetails
                  tweet={tweets[id]}
                  key={id}
                  clickFunction={() => {
                    handleClick(id);
                  }}
                />
              ))}
            </Wrapper>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </>
  );
};

export default Profile;

const Wrapper = styled.div`
  border: 2px solid ${COLORS.secondary};
  margin-right: 40px;
`;

const Banner = styled.img`
  height: auto;
  width: 100%;
`;

const Avatar = styled.img`
  border: 4px solid white;
  border-radius: 50%;
  left: 265px;
  /* left: 19.5%; */
  position: absolute;
  /* top: 260px; */
  top: 42%;
  width: 180px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 30px;
  padding-right: 20px;
  padding-top: 30px;
`;

const Follow = styled.button`
  border: 1px solid blue;
  border-radius: 25px;
  color: blue;
  height: 40px;
  font-size: 1.2em;
  font-weight: bold;
  padding-bottom: 5px;
  width: 100px;
`;

const Content = styled.div`
  margin-left: 20px;
`;

const Name = styled.p`
  font-size: 1.4em;
  font-weight: bold;
`;

const Handle = styled.p`
  color: grey;
  margin-bottom: 15px;
  margin-top: 5px;
`;

const Bio = styled.p`
  font-size: 1.1em;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const LocationJoined = styled.div`
  color: grey;
  display: flex;
  font-size: 1.1em;
`;

const Location = styled.p``;

const Joined = styled.p`
  margin-left: 10px;
`;

const FollowInfo = styled.div`
  display: flex;
  font-size: 1.1em;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const NumFollowers = styled.p``;

const NumFollowing = styled.p`
  margin-left: 20px;
`;

const DisplaySelector = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

// const DisplayOption = styled.button`
//   border: none;
//   height: 50px;
//   width: 33%;
// `;

const DisplayOption = styled.button`
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 1.2em;
  padding-bottom: 20px;
  padding-top: 20px;
  width: 33%;

  &:hover {
    color: ${COLORS.primary};
    border-bottom: 3px solid ${COLORS.primary};
  }
`;
