import React from "react";
import styled from "styled-components";
import { theme, ThemeSet } from "../theme";

const IndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  height: 100vh;
`;

const Indicator = styled.div<ThemeSet>`
  width: 130px;
  height: 130px;
  background-color: skyblue;
  border-radius: 50%;
  position: relative;
  box-shadow: inset 0 0 30px 0 rgba(0, 0, 0, 0.5),
    0 6px 10px 0 rgba(0, 0, 0, 0.5);
  overflow: hidden;

  @media ${(props) => props.tablet} {
    width: 200px;
    height: 200px;
  }

  @media ${(props) => props.desktop} {
    width: 200px;
    height: 200px;
  }

  :before,
  :after {
    content: "";
    position: absolute;
    width: 180px;
    height: 230px;
    top: -150px;
    background-color: #fff;

    @media ${(props) => props.tablet} {
      width: 270px;
      height: 270px;
    }
    @media ${(props) => props.desktop} {
      width: 270px;
      height: 270px;
    }
  }

  :before {
    border-radius: 45%;
    background: rgba(255, 255, 255, 0.7);
    animation: wave 5s linear infinite;
    -webkit-animation: wave 5s linear infinite;
  }
  :after {
    border-radius: 35%;
    background: rgba(255, 255, 255, 0.3);
    animation: wave 5s linear infinite;
    -webkit-animation: wave 5s linear infinite;
  }

  @-webkit-keyframes wave {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes wave {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Message = styled.div`
  font-size: 1.5rem;
  margin-top: 2rem;
`;

export default function LoadingIndicator(): JSX.Element {
  return (
    <>
      <IndicatorContainer>
        <Indicator {...theme}></Indicator>
        <Message>결과를 기다리는 중입니다.</Message>
      </IndicatorContainer>
    </>
  );
}
