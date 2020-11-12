import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ActionBar from "./ActionBar";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const BigTweetDetails = () => {
  const [currentTweet, setCurrentTweet] = useState(null);
  const { tweetId } = useParams();

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((res) => {
        setCurrentTweet(res.tweet);
      })
      .catch((error) => console.log(error));
  }, []);

  if (currentTweet) {
    const { status, author, timestamp } = currentTweet;
    const { avatarSrc, handle, displayName } = author;
    let time = format(new Date(timestamp), "H:mm a · MMM d yyyy");
    return (
      <Wrapper>
        <Container>
          <Avatar src={avatarSrc} />
          <div>
            <Info>
              <Name>{displayName}</Name>
              <Handle>
                @{handle} · {time}
              </Handle>
            </Info>
            <Body>{status}</Body>
          </div>
        </Container>
        <ActionBar />
      </Wrapper>
    );
  } else {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
};

const Wrapper = styled.div`
  border: 2px solid grey;
  margin: 10px;
`;

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

export default BigTweetDetails;
