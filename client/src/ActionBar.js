import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiMessageCircle, FiRepeat, FiHeart, FiShare } from "react-icons/fi";
import { IconContext } from "react-icons";

const ActionBar = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(tweet.isLiked);
  const [numOfLikes, setNumOfLikes] = useState(tweet.numLikes);

  const likeTweet = () => {
    console.log("line 11");
    fetch(`/api/tweet/${tweet.id}/like`, {
      method: "PUT",
      body: JSON.stringify({ like: !isLiked }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        !isLiked
          ? setNumOfLikes(numOfLikes + 1)
          : setNumOfLikes(numOfLikes - 1);
        setIsLiked(!isLiked);
      });
  };

  if (tweet) {
    const handleSubmit = (e) => {
      e.stopPropagation();
      likeTweet();
    };

    return (
      <Wrapper>
        <IconContext.Provider
          value={{ color: "grey", size: "1.1em", weight: "bold" }}
        >
          <FiMessageCircle />
          <FiRepeat />
          <HeartContainer>
            <Button>
              <FiHeart onClick={handleSubmit} margin-right="5px" tabIndex="0" />
            </Button>
            {numOfLikes > 0 && (
              <Number>
                <p>{numOfLikes}</p>
              </Number>
            )}
          </HeartContainer>
          <FiShare />
        </IconContext.Provider>
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
  /* align-self: flex-start; */
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
`;

const HeartContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  all: unset;
  &:hover {
    cursor: pointer;
  }
`;

const Number = styled.div`
  margin-left: 5px;
`;

export default ActionBar;
