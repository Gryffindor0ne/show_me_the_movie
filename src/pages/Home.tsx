import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { theme, ThemeSet } from "../theme";

const Section = styled.section<ThemeSet>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
`;

const MainContainer = styled.section<ThemeSet>`
  display: grid;
  color: white;
  margin: 1rem;
  grid-template-rows: repeat(5, 7rem);
  grid-template-columns: auto;
  padding-top: 3rem;

  @media ${(props) => props.tablet} {
    grid-template-rows: repeat(6, 9rem);
    grid-template-columns: repeat(1, 35rem);
  }

  @media ${(props) => props.desktop} {
    grid-template-rows: repeat(4, 8rem);
    grid-template-columns: repeat(2, 30rem);
  }
`;

const TitleBox = styled.div<ThemeSet>`
  grid-row: 1/2;
  grid-column: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    font-size: 3rem;
    font-family: "Luckiest Guy", cursive;
    margin-bottom: 0.5rem;
  }

  @media ${(props) => props.minimum} {
    > div {
      font-size: 3.2rem;
    }
  }

  @media ${(props) => props.tablet} {
    > div {
      font-size: 5.5rem;
    }
  }

  @media ${(props) => props.desktop} {
    grid-row: 1/3;
    grid-column: 1/2;

    > div {
      font-size: 5rem;
    }
  }
`;

const TextBox = styled.div<ThemeSet>`
  grid-row: 2/3;
  grid-column: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    font-size: 1rem;
    font-family: "EliceDigitalBaeum_Regular";
    color: #1a237e;
    margin-bottom: 0.1rem;
  }

  @media ${(props) => props.tablet} {
    margin-top: 3.7rem;
    > div {
      font-size: 1.5rem;
    }
  }

  @media ${(props) => props.desktop} {
    grid-row: 3/4;
    grid-column: 1/2;
    margin-bottom: 2rem;

    > div {
      font-size: 1.4rem;
      margin-bottom: 0.3rem;
    }
  }
`;

const Image = styled.img<ThemeSet>`
  display: flex;
  justify-content: center;
  align-items: center;

  grid-row: 3/5;
  grid-column: 1/1;

  width: 17rem;
  height: 15rem;
  padding-top: 2rem;

  @media ${(props) => props.minimum} {
    width: 15rem;
  }

  @media ${(props) => props.tablet} {
    grid-row: 3/6;
    grid-column: 1/1;
    width: 36rem;
    height: 26rem;
    padding-top: 3rem;
  }

  @media ${(props) => props.desktop} {
    grid-row: 1/5;
    grid-column: 2/3;
    width: 27rem;
    height: 32rem;
    padding-top: 5rem;
  }
`;

const BtnCotainer = styled.div<ThemeSet>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  grid-row: 5/6;
  grid-column: 1/1;
  margin-top: 2.5rem;

  > button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 25px;
    background: #009688;
    color: black;
    font-size: 1.7rem;
    font-family: "Luckiest Guy", cursive;
    width: 15rem;
    height: 3rem;

    padding-top: 0.6rem;
    box-shadow: 0px 3px 3px 1px black;
    :hover {
      background: #1a237e;
      color: white;
    }
  }

  @media ${(props) => props.tablet} {
    grid-row: 6/7;
    grid-column: 1/1;

    > button {
      font-size: 2.3rem;
      width: 17rem;
      height: 3rem;
    }
  }

  @media ${(props) => props.desktop} {
    grid-row: 4/5;
    grid-column: 1/2;
    margin-bottom: 0rem;

    > button {
      font-size: 2rem;
      width: 15rem;
      height: 3rem;
    }
  }
`;

export default function Home() {
  const navigate = useNavigate();

  return (
    <Section {...theme}>
      <MainContainer {...theme}>
        <TitleBox {...theme}>
          <div>SHOW ME</div>
          <div>THE MOVIE</div>
        </TitleBox>
        <TextBox {...theme}>
          <div>지금 뭘 볼까?</div>
          <div>고민하는 이 순간!</div>
          <div>최애 리스트 중에서</div>
          <div>하나를 골라보자!</div>
        </TextBox>
        <BtnCotainer {...theme}>
          <button
            onClick={() => {
              navigate("/question");
            }}
          >
            Let's go!
          </button>
        </BtnCotainer>
        <Image {...theme} src="cinema.svg"></Image>
      </MainContainer>
    </Section>
  );
}
