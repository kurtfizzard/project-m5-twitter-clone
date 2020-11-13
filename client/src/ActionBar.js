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
  align-self: flex-start;
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
`;

export default ActionBar;
