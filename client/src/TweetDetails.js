import React from "react";
import styled from "styled-components";
import ActionBar from "./ActionBar";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

const TweetDetails = ({ tweet, clickFunction }) => {
  let history = useHistory();

  if (tweet) {
    const { status, author, timestamp } = tweet;
    const { avatarSrc, handle, displayName } = author;
    let time = format(new Date(timestamp), "MMM d");

    return (
      <Wrapper onClick={clickFunction} tabIndex="0">
        <Container>
          <Avatar src={avatarSrc} />
          <div>
            <Info>
              <Name
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/${handle}`);
                }}
              >
                {displayName}
              </Name>
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

export default TweetDetails;

const Wrapper = styled.div`
  border: 2px solid whitesmoke;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
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

const Name = styled.button`
  all: unset;
  font-weight: bold;
  margin-right: 5px;
`;
const Handle = styled.p`
  color: grey;
  margin-top: 0px;
`;
const Body = styled.p``;
