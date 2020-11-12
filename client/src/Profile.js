import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useCurrentUser } from "./CurrentUserContext";
import TweetDetails from "./TweetDetails";
import { useHistory } from "react-router-dom";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { COLORS } from "./Constants";

const Profile = () => {
  // const { currentUser, status } = useCurrentUser();
  const [currentProfile, setCurrentProfile] = useState(null);
  // const [currentStatus, setCurrentStatus] = useState("loading");
  const [tweetIds, setTweetIds] = useState(null);
  const [tweets, setTweets] = useState(null);
  // const [currentDisplay, setCurrentDisplay] = useState("tweets");

  const { profileId } = useParams();

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCurrentProfile(res.profile);
        // setProfileStatus("idle");
      })
      .catch((error) => {
        console.log(error);
        // setCurrentStatus("error");
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
      .catch((error) => console.log(error));
  }, []);

  let history = useHistory();

  function handleClick(id) {
    history.push(`/tweet/${id}`);
  }

  // handleDisplay = () => {
  //   setCurrentDisplay("");
  // };

  return (
    <div>
      {tweetIds && tweets && currentProfile ? (
        <div>
          <Banner src={currentProfile.bannerSrc} />
          <Avatar src={currentProfile.avatarSrc} />
          <Follow>Follow</Follow>
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
                <bold>{currentProfile.numFollowers}</bold> Followers
              </NumFollowers>
              <NumFollowing>
                <bold>{currentProfile.numFollowing}</bold> Following
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;

const Banner = styled.img`
  width: 100%;
`;

const Avatar = styled.img`
  border: 4px solid white;
  border-radius: 50%;
  left: 240px;
  position: absolute;
  width: 200px;
`;

const Follow = styled.button`
  border: 1px solid blue;
  border-radius: 25px;
  color: blue;
  height: 40px;
  font-size: 15px;
  font-weight: bold;
  width: 100px;
`;

const Content = styled.div`
  margin-left: 20px;
`;

const Name = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const Handle = styled.p`
  color: grey;
`;

const Bio = styled.p`
  margin-bottom: 10px;
  margin-top: 10px;
`;

const LocationJoined = styled.div`
  display: flex;
  color: grey;

  &:bold {
    font-weight: bold;
  }
`;

const Location = styled.p``;

const Joined = styled.p`
  margin-left: 10px;
`;

const FollowInfo = styled.div`
  display: flex;
`;

const NumFollowers = styled.p``;

const NumFollowing = styled.p`
  margin-left: 10px;
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
  width: 33%;
  font-size: 22px;
  background: none;
  border: none;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  &:hover {
    color: ${COLORS.primary};
    border-bottom: 3px solid ${COLORS.primary};
  }
`;
