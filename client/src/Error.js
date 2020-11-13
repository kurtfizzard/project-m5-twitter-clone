import React from "react";
import styled from "styled-components";
import { FaBomb } from "react-icons/fa";

const Error = () => {
  return (
    <Wrapper>
      <FaBomb size="4em" />
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
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Notice = styled.p`
  font-size: 40px;
  font-weight: bold;
  margin: 10px;
`;

const Suggestion = styled.p`
  font-size: 20px;
`;

export default Error;
