import React, { useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import TweetDetails from "./TweetDetails";
import styled from "styled-components";
import { COLORS } from "./Constants";
import { useHistory } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";

const HomeFeed = () => {
  const [tweetIds, setTweetIds] = useState([]);
  const [tweets, setTweets] = useState({});
  const { currentUser } = useCurrentUser();
  const [textEntry, setTextEntry] = useState("");
  const [charactersLeft, setCharactersLeft] = useState(280);
  const [isColor, setIsColor] = useState("grey");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmitted, setIsSumitted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/me/home-feed`)
      .then((res) => res.json())
      .then((res) => {
        setTweetIds(res.tweetIds);
        setTweets(res.tweetsById);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [isSubmitted]);

  let history = useHistory();

  function handleClick(id) {
    history.push(`/tweet/${id}`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/tweet", {
      method: "POST",
      body: JSON.stringify({ status: textEntry }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("success", res);
      });
    setIsSumitted(true);
    setTextEntry("");
    setCharactersLeft(280);
  };

  return (
    <>
      {error ? (
        <Error />
      ) : (
        <>
          {tweetIds && tweets && currentUser ? (
            <Wrapper>
              <Home>Home</Home>
              <AvatarTweet>
                <Avatar src={currentUser.avatarSrc} />
                <TweetBox
                  type="text"
                  placeholder="What's happening?"
                  value={textEntry}
                  onChange={(event) => {
                    // handleChange();
                    setTextEntry(event.target.value);
                    const charactersRemaining = 280 - event.target.value.length;
                    // setCharactersLeft(280 - event.target.value.length);
                    setCharactersLeft(charactersRemaining);
                    charactersRemaining < 0
                      ? setIsColor("red")
                      : charactersRemaining < 56
                      ? setIsColor("yellow")
                      : setIsColor("grey");
                    charactersRemaining < 0 || charactersRemaining === 280
                      ? setIsDisabled(true)
                      : setIsDisabled(false);
                  }}
                />
              </AvatarTweet>
              <ButtonContainer>
                <Characters style={{ color: isColor }}>
                  {charactersLeft}
                </Characters>
                <Meow
                  disabled={isDisabled}
                  onClick={handleSubmit}
                  style={{ opacity: isDisabled ? 0.5 : 1 }}
                >
                  Meow
                </Meow>
              </ButtonContainer>
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
            <Loading />
          )}
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  border: 2px solid ${COLORS.secondary};
  margin-right: 40px;
`;

const Home = styled.p`
  border-bottom: 2px solid ${COLORS.secondary};
  font-size: 1.4em;
  font-weight: bold;
  padding: 15px;
  padding-bottom: 20px;
`;

const AvatarTweet = styled.div`
  padding: 10px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 60px;
  top: none;
  width: 60px;
`;

const TweetBox = styled.textarea`
  border: none;
  font-family: sans-serif;
  font-size: 1.3em;
  height: 100px;
  margin: 10px;
  resize: none;
  width: 80%;

  ::placeholder {
    /* font-size: 1.5em; */
    font-family: sans-serif;
  }

  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  align-items: center;
  border-bottom: 12px solid ${COLORS.secondary};
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  width: 100%;
`;

const Characters = styled.p`
  color: ${COLORS.secondary};
  font-weight: bold;
  margin-right: 15px;
`;

const Meow = styled.button`
  background: ${COLORS.primary};
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  height: 40px;
  padding-bottom: 5px;
  width: 80px;

  &:hover {
    cursor: pointer;
  }
`;

export default HomeFeed;
