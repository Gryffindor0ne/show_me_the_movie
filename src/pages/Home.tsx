import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
`;

const MainContainer = styled.section`
  margin: 1rem;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-rows: repeat(4, 7.5rem);
  grid-template-columns: repeat(2, 27rem);
  color: white;
`;

const TitleBox = styled.div`
  grid-row: 1/3;
  grid-column: 1/2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 0.5rem; */
`;

const Title = styled.div`
  font-size: 5rem;
  font-family: "Luckiest Guy", cursive;
  margin-bottom: 0.5rem;
`;

const TextBox = styled.div`
  grid-row: 3/4;
  grid-column: 1/2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-size: 1.2rem;
  font-family: "EliceDigitalBaeum_Regular";
  color: #1a237e;
  margin-bottom: 0.4rem;
`;

const Image = styled.img`
  grid-row: 1/5;
  grid-column: 2/3;
  display: flex;
  width: 27rem;
  height: 30rem;
  padding-top: 5rem;
`;

const BtnCotainer = styled.div`
  grid-row: 4/5;
  grid-column: 1/2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    <Section>
      <MainContainer>
        <TitleBox>
          <Title>SHOW ME</Title>
          <Title>THE MOVIE</Title>
        </TitleBox>
        <TextBox>
          <Text>지금 뭘 볼까?</Text>
          <Text>고민하는 이 순간!</Text>
          <Text>최애 리스트 중에서</Text>
          <Text>하나를 골라보자!</Text>
        </TextBox>
        <BtnCotainer>
          <Btn
            onClick={() => {
              navigate("/question");
            }}
          >
            Let's go!
          </Btn>
        </BtnCotainer>
        <Image src="cinema.svg"></Image>
      </MainContainer>
    </Section>
  );
}
