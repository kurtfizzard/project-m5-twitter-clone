import React from "react";
import styled from "styled-components";
import ActionBar from "./ActionBar";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import Loading from "./Loading";

const TweetDetails = ({ tweet, clickFunction }) => {
  let history = useHistory();
  if (tweet) {
    console.log(tweet);
    const { status, author, media, timestamp } = tweet;
    const { avatarSrc, handle, displayName } = author;
    const time = format(new Date(timestamp), "MMM d");

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
                tabIndex="0"
              >
                {displayName}
              </Name>
              <Handle>
                @{handle} · {time}
              </Handle>
            </Info>
            <Body>{status}</Body>
            {media.length > 0 ? <Media src={media[0].url} /> : <></>}
          </div>
        </Container>
        <ActionBar tweet={tweet} />
      </Wrapper>
    );
  } else {
    return <Loading />;
  }
};

const Wrapper = styled.div`
  border-bottom: 2px solid whitesmoke;
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
  margin-right: 10px;
  height: 60px;
  width: 60px;
`;

const Info = styled.div`
  display: flex;
`;

const Name = styled.button`
  all: unset;
  font-size: 1.1em;
  font-weight: bold;
  margin-right: 5px;
`;
const Handle = styled.p`
  color: grey;
  margin-top: 0px;
`;
const Body = styled.p`
  padding-bottom: 10px;
  padding-top: 10px;
  width: 100%;
`;

const Media = styled.img`
  border-radius: 20px;
  width: 100%;
`;

export default TweetDetails;
