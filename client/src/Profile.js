import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useCurrentUser } from "./CurrentUserContext";

import { FiMapPin, FiCalendar } from "react-icons/fi";

const Profile = () => {
  // const { currentUser, status } = useCurrentUser();
  const [currentProfile, setCurrentProfile] = useState(null);
  const [profileStatus, setProfileStatus] = useState("loading");

  const { profileId } = useParams();

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((res) => {
        setCurrentProfile(res.profile);
        setProfileStatus("idle");
      })
      .catch((error) => console.log(error));
  }, [profileId]);

  console.log(currentProfile);

  return (
    <div>
      {profileStatus === "loading" ? (
        <p>Loading...</p>
      ) : (
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
        </div>
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
