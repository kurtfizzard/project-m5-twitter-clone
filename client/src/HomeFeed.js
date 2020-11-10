import React, { useEffect, useState } from "react";

import { useCurrentUser } from "./CurrentUserContext";

import TweetDetails from "./TweetDetails";

import styled from "styled-components";

import { COLORS } from "./Constants";

const HomeFeed = () => {
  // const [tweetKeys, setTweetKeys] = useState([]);
  // const [tweetsByKeys, setTweetsByKeys] = useState({});
  const [tweets, setTweets] = useState([]);

  const { currentUser } = useCurrentUser();
  console.log(currentUser);

  useEffect(() => {
    fetch(`/api/me/home-feed`)
      .then((res) => res.json())
      .then((res) => {
        setTweets(Object.values(res.tweetsById));
        // setTweetKeys(tweetIds);
        // setTweetsByKeys(tweetsById);
      })
      .catch((error) => console.log(error));
  }, []);

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
      {currentUser ? (
        <>
          <AvatarTweet>
            <Avatar src={currentUser.avatarSrc} />
            <TweetBox type="text" placeholder="What's happening?" />
          </AvatarTweet>
          <Meow>Meow</Meow>
          {tweets.map((tweet) => (
            <TweetDetails tweet={tweet} key={tweet.id} />
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
  margin: 10px;
`;

const AvatarTweet = styled.div``;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  margin: 10px;
  margin-top: 0px;
`;

const TweetBox = styled.input`
  border: none;
  height: 100px;
  width: 80%;
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
