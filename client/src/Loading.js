import React from "react";
import styled from "styled-components";
import { Roller } from "react-awesome-spinners";
import { COLORS } from "./Constants";

const Loading = () => {
  return (
    <Wrapper>
      <Roller color={COLORS.primary} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default Loading;
