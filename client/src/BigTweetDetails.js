import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ActionBar from "./ActionBar";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Error from "./Error";
import { COLORS } from "./Constants";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";

const BigTweetDetails = () => {
  const [currentTweet, setCurrentTweet] = useState(null);
  const { tweetId } = useParams();
  const [error, setError] = useState(false);

  let history = useHistory();

  function goBack() {
    window.history.back();
  }

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
      console.log(currentTweet);
      const { status, author, media, timestamp } = currentTweet;
      const { avatarSrc, handle, displayName } = author;
      const time = format(new Date(timestamp), "H:mm a · MMM d yyyy");
      return (
        <Wrapper>
          <Header>
            <FiArrowLeft onClick={goBack} />
            <Meow>Meow</Meow>
          </Header>
          <Container>
            <div>
              <Top>
                <Avatar src={avatarSrc} />
                <div>
                  <Name
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/${handle}`);
                    }}
                    tabIndex="0"
                  >
                    {displayName}
                  </Name>
                  <Handle>@{handle}</Handle>
                </div>
              </Top>
              <Body>{status}</Body>
              {media.length > 0 ? <Media src={media[0].url} /> : <></>}
              <Time>{time}</Time>
            </div>
          </Container>
          <ActionBar tweet={currentTweet} />
        </Wrapper>
      );
    } else {
      return <Loading />;
    }
  }
};

const Wrapper = styled.div`
  border: 2px solid ${COLORS.secondary};
  margin-right: 40px;
  width: 100%;
`;

const Header = styled.p`
  align-items: center;
  border-bottom: 2px solid ${COLORS.secondary};
  display: flex;
  font-size: 1.4em;
  font-weight: bold;
  padding: 15px;
  padding-bottom: 20px;
`;

const Meow = styled.p`
  margin-left: 20px;
`;

const Container = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  margin: 10px;
`;

const Top = styled.div`
  align-items: center;
  display: flex;
`;

const Name = styled.a`
  font-weight: bold;
  margin-right: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const Handle = styled.p`
  color: grey;
  margin-top: 0px;
`;

const Body = styled.p`
  font-size: 1.3em;
  margin: 10px;
`;

const Media = styled.img`
  border-radius: 20px;
  margin: 10px;
  width: 90%;
`;

const Time = styled.div`
  margin: 10px;
`;

export default BigTweetDetails;
