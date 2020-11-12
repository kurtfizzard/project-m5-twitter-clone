import React from "react";
import styled from "styled-components";
import { FiMessageCircle, FiRepeat, FiHeart, FiShare } from "react-icons/fi";
import { IconContext } from "react-icons";

const ActionBar = () => {
  return (
    <Wrapper>
      <IconContext.Provider value={{ color: "grey" }}>
        <FiMessageCircle />
        <FiRepeat />
        <FiHeart />
        <FiShare />
      </IconContext.Provider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 75%;
`;

export default ActionBar;
