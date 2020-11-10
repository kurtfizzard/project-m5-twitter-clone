import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "./assets/logo.svg";

const TweetDetails = ({ tweet }) => {
  const { status, author, media, timestamp } = tweet;

  const { avatarSrc, handle, displayName } = author;

  return (
    <Container>
      <Avatar src={avatarSrc} />
      <div>
        <Info>
          <Name>{displayName}</Name>
          <Handle>
            @{handle} * {timestamp}
          </Handle>
        </Info>
        <Body>{status}</Body>
      </div>
    </Container>
  );
};

export default TweetDetails;

const Container = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  margin: 10px;
  margin-top: 0px;
`;

const Info = styled.div`
  display: flex;
`;

const Name = styled.a`
  font-weight: bold;
  margin-right: 5px;
`;
const Handle = styled.p`
  color: grey;
  margin-top: 0px;
`;
const Body = styled.p``;
