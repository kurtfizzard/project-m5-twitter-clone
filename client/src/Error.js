import React from "react";
import styled from "styled-components";
import { FaBomb } from "react-icons/fa";

const Error = () => {
  return (
    <Wrapper>
      <FaBomb />
      <Notice>An unknown error has occured.</Notice>
      <Suggestion>
        Please try refreshing the page, or <a href="">contact support</a> if the
        problem persists.
      </Suggestion>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Notice = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const Suggestion = styled.p``;

export default Error;
