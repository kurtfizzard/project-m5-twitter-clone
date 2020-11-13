import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ActionBar from "./ActionBar";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Error from "./Error";
import { COLORS } from "./Constants";

const BigTweetDetails = () => {
  const [currentTweet, setCurrentTweet] = useState(null);
  const { tweetId } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((res) => {
        setCurrentTweet(res.tweet);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  if (error) {
    return (
      <>
        <Error />
      </>
    );
  } else {
    if (currentTweet) {
      const { status, author, timestamp } = currentTweet;
      const { avatarSrc, handle, displayName } = author;
      let time = format(new Date(timestamp), "H:mm a · MMM d yyyy");
      return (
        <Wrapper>
          <Meow>Meow</Meow>
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
  }
};

const Wrapper = styled.div`
  border: 2px solid ${COLORS.secondary};
  margin-right: 40px;
  width: 100%;
`;

const Meow = styled.p`
  border-bottom: 2px solid ${COLORS.secondary};
  font-size: 1.4em;
  font-weight: bold;
  padding: 15px;
  padding-bottom: 20px;
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
