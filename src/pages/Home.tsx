import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { theme, ThemeSet } from "../theme";

const Section = styled.section<ThemeSet>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;

  margin-left: auto;
  margin-right: auto;

  @media ${(props) => props.minimum} {
    min-height: 1000px;
  }
  @media ${(props) => props.mobile} {
    min-height: 1000px;
  }
  @media ${(props) => props.tablet} {
    min-height: 700px;
  }
  @media ${(props) => props.desktop} {
    height: 100vh;
  }
`;

const MainContainer = styled.section<ThemeSet>`
  display: grid;
  color: white;
  margin: 1rem;
  grid-gap: 0.5rem;
  grid-template-rows: repeat(7, 8rem);
  grid-template-columns: auto;

  @media ${(props) => props.tablet} {
    grid-template-rows: repeat(4, 6rem);
    grid-template-columns: repeat(2, 22rem);
  }

  @media ${(props) => props.desktop} {
    grid-template-rows: repeat(4, 7.5rem);
    grid-template-columns: repeat(2, 27rem);
  }
`;

const TitleBox = styled.div<ThemeSet>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-row: 1/3;
  grid-column: 1/1;

  @media ${(props) => props.tablet} {
    grid-row: 1/3;
    grid-column: 1/2;
  }

  @media ${(props) => props.desktop} {
    grid-row: 1/3;
    grid-column: 1/2;
  }
`;

const Title = styled.div<ThemeSet>`
  font-size: 3.7rem;
  font-family: "Luckiest Guy", cursive;
  margin-bottom: 0.5rem;

  @media ${(props) => props.minimum} {
    font-size: 3.2rem;
  }

  @media ${(props) => props.desktop} {
    font-size: 5rem;
  }
`;

const TextBox = styled.div<ThemeSet>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  grid-row: 3/4;
  grid-column: 1/1;

  @media ${(props) => props.tablet} {
    grid-row: 3/4;
    grid-column: 1/2;
  }

  @media ${(props) => props.desktop} {
    grid-row: 3/4;
    grid-column: 1/2;
  }
`;

const Text = styled.div`
  font-size: 1.2rem;
  font-family: "EliceDigitalBaeum_Regular";
  color: #1a237e;
  margin-bottom: 0.4rem;
`;

const Image = styled.img<ThemeSet>`
  display: flex;
  justify-content: center;
  align-items: center;

  grid-row: 4/7;
  grid-column: 1/1;

  width: 20rem;
  height: auto;
  padding-top: 2rem;

  @media ${(props) => props.minimum} {
    width: 15rem;
  }

  @media ${(props) => props.tablet} {
    grid-row: 1/5;
    grid-column: 2/3;
    width: 20rem;
    height: 25rem;
    padding-top: 5rem;
  }

  @media ${(props) => props.desktop} {
    grid-row: 1/5;
    grid-column: 2/3;
    width: 27rem;
    height: 30rem;
    padding-top: 5rem;
  }
`;

const BtnCotainer = styled.div<ThemeSet>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  grid-row: 7/8;
  grid-column: 1/1;
  margin-bottom: 5rem;

  @media ${(props) => props.tablet} {
    grid-row: 4/5;
    grid-column: 1/2;
    margin-bottom: 0rem;
  }

  @media ${(props) => props.desktop} {
    grid-row: 4/5;
    grid-column: 1/2;
    margin-bottom: 0rem;
  }
`;

const Btn = styled.button`
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
  margin-top: 2rem;
  margin-bottom: 3rem;
  padding-top: 0.6rem;
  box-shadow: 0px 3px 3px 1px black;
  :hover {
    background: #1a237e;
    color: white;
  }
`;

export default function Home() {
  const navigate = useNavigate();

  return (
    <Section {...theme}>
      <MainContainer {...theme}>
        <TitleBox {...theme}>
          <Title {...theme}>SHOW ME</Title>
          <Title {...theme}>THE MOVIE</Title>
        </TitleBox>
        <TextBox {...theme}>
          <Text>지금 뭘 볼까?</Text>
          <Text>고민하는 이 순간!</Text>
          <Text>최애 리스트 중에서</Text>
          <Text>하나를 골라보자!</Text>
        </TextBox>
        <BtnCotainer {...theme}>
          <Btn
            onClick={() => {
              navigate("/question");
            }}
          >
            Let's go!
          </Btn>
        </BtnCotainer>
        <Image {...theme} src="cinema.svg"></Image>
      </MainContainer>
    </Section>
  );
}
