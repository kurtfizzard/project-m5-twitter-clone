import React, { useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import TweetDetails from "./TweetDetails";
import styled from "styled-components";
import { COLORS } from "./Constants";
import { useHistory } from "react-router-dom";

const HomeFeed = () => {
  const [tweetIds, setTweetIds] = useState([]);
  const [tweets, setTweets] = useState({});
  const { currentUser } = useCurrentUser();
  const [textEntry, setTextEntry] = useState("");
  const [charactersLeft, setCharactersLeft] = useState(280);
  const [isColor, setIsColor] = useState("grey");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmitted, setIsSumitted] = useState(false);

  useEffect(() => {
    fetch(`/api/me/home-feed`)
      .then((res) => res.json())
      .then((res) => {
        setTweetIds(res.tweetIds);
        setTweets(res.tweetsById);
      })
      .catch((error) => console.log(error));
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

  // const tweet = {
  //   method: "POST",
  //   headers: { "content-type": "application/json" },
  //   body: JSON.stringify(("status": "sdss")),
  // };
  // fetch("/api/tweet", requestOptions)
  //   .then((res) => res.json())
  //   .then((data) => {});

  // function handleChange(event) {
  //   let input = event.target.value;
  //   setCharactersLeft(charactersLeft - input.length);
  // }

  // const tweets = tweetKeys
  //   ? tweetKeys.map((key) => {
  //       return (
  //         <TweetDetails
  //           tweet={tweetsByKeys[key]}
  //           key={Math.random() * 1000000000}
  //         />
  //       );
  //     })
  //   : [];

  // useEffect(() => {
  //   try {
  //     fetch(`/api/${currentUser}/feed`)
  //       .then((res) => res.json())
  //       .then(({ tweetIds, tweetsById }) => {});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [currentUser]);

  // return <>{tweets}</>;

  return (
    <Wrapper>
      <Home>Home</Home>
      {tweetIds && tweets && currentUser ? (
        <>
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
            <Characters style={{ color: isColor }}>{charactersLeft}</Characters>
          </AvatarTweet>
          <ButtonContainer>
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Home = styled.p`
  font-size: 30px;
  font-weight: bold;
  padding: 15px;
`;

const AvatarTweet = styled.div``;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  margin: 10px;
  margin-top: 0px;
`;

const TweetBox = styled.textarea`
  border: none;
  height: 100px;
  width: 80%;

  ::placeholder {
    font-size: 20px;
    font-family: sans-serif;
  }
`;

const Characters = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  width: 100%;

  &:disabled {
    color: red;
  }
`;

const Meow = styled.button`
  background: ${COLORS.primary};
  border: none;
  border-radius: 15px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  height: 30px;
  width: 60px;
`;

export default HomeFeed;
