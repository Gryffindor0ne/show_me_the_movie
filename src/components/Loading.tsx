import styled from "styled-components";

const IndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Indicator = styled.div`
  width: 200px;
  height: 200px;
  background-color: skyblue;
  border-radius: 50%;
  position: relative;
  box-shadow: inset 0 0 30px 0 rgba(0, 0, 0, 0.5),
    0 4px 10px 0 rgba(0, 0, 0, 0.5);
  overflow: hidden;

  :before,
  :after {
    content: "";
    position: absolute;
    width: 270px;
    height: 270px;
    top: -150px;
    background-color: #fff;
  }
  :before {
    border-radius: 45%;
    background: rgba(255, 255, 255, 0.7);
    animation: wave 5s linear infinite;
  }
  :after {
    border-radius: 35%;
    background: rgba(255, 255, 255, 0.3);
    animation: wave 5s linear infinite;
  }
  @keyframes wave {
    0% {
      transform: rotate(0);
    }
    100% {
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
        <Indicator></Indicator>
        <Message>결과를 기다리는 중입니다.</Message>
      </IndicatorContainer>
    </>
  );
}
