import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.3rem;
`;

const Title = styled.div`
  font-size: 4.2rem;
  font-family: "Roboto", sans-serif;
  margin-bottom: 0.2rem;
`;

const Text = styled.div`
  font-size: 1.2rem;
  font-family: "EliceDigitalBaeum_Regular";
  margin-bottom: 0.5rem;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Image = styled.img`
  display: flex;
  width: 30vw;
  height: 60vh;
`;

const Btn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 25px;
  background: #2196f3;
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
  width: 15rem;
  height: 2.7rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
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
      <CommentBox>
        <TitleBox>
          <Title>SHOW ME</Title>
          <Title>THE MOVIE</Title>
        </TitleBox>
        <Text>지금 뭘 볼까?</Text>
        <Text>고민하는 이 순간!</Text>
        <Text>최애 리스트 중에서</Text>
        <Text>하나를 골라보자!</Text>
        <Btn
          onClick={() => {
            navigate("/question");
          }}
        >
          Let's go!
        </Btn>
      </CommentBox>
      <Image src="cinema.svg"></Image>
    </Section>
  );
}
