import styled from "styled-components";

const IndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Indicator = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 11px solid #64dd17;
  border-color: #64dd17 transparent transparent;
  animation: spin 0.8s linear infinite;
  margin-bottom: 5rem;

  @keyframes spin {
    100% {
      transform: rotate(260deg);
    }
  }
`;

const Message = styled.div`
  font-size: 1.5rem;
`;

export default function LoadingIndicator(): JSX.Element {
  return (
    <>
      <IndicatorContainer>
        <Indicator></Indicator>
        <Message>결과를 기다리는 중입니다...</Message>
      </IndicatorContainer>
    </>
  );
}
