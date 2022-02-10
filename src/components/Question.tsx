import React, { useEffect, useState } from "react";
import { makeOrder } from "../utils/makeOrder";
import { QuestionSet, questionList } from "../static/questionList";
import styled from "styled-components";
import { theme, ThemeSet } from "../theme";

const QuestionContainer = styled.section<ThemeSet>`
  margin: 1rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: repeat(4, 7rem);
  grid-template-columns: repeat(1, 17rem);
  justify-content: center;
  align-items: center;
  width: 100vw;

  @media ${(props) => props.tablet} {
    grid-gap: 1rem;
    grid-template-rows: repeat(4, 10rem);
    grid-template-columns: repeat(1, 28rem);
  }

  @media ${(props) => props.desktop} {
    grid-gap: 1rem;
    grid-template-rows: repeat(4, 9rem);
    grid-template-columns: repeat(1, 28rem);
  }
`;

const ProgressBarContainer = styled.div`
  grid-row: 1/2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Number = styled.div`
  font-weight: bold;
  margin-top: 4rem;
  margin-bottom: 0.5rem;
`;

const Progress = styled.div<ThemeSet>`
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
  width: 230px;
  padding: 1px;
  margin-bottom: 3rem;

  @media ${(props) => props.tablet} {
    width: 400px;
  }

  @media ${(props) => props.desktop} {
    width: 400px;
  }
`;

const ProgressBar = styled.div<ProBar>`
  height: 9px;
  border-radius: 4px;
  border: 2px solid black;
  background-image: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: -moz-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: -o-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  -webkit-transition: 0.4s linear;
  -moz-transition: 0.4s linear;
  -o-transition: 0.4s linear;
  transition: 0.4s linear;
  -webkit-transition-property: width, background-color;
  -moz-transition-property: width, background-color;
  -o-transition-property: width, background-color;
  transition-property: width, background-color;
  -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25),
    inset 0 1px rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25),
    inset 0 1px rgba(255, 255, 255, 0.1);

  width: ${(props: ProBar) => props.width};
  background-color: ${(props: ProBar) => props.back};
`;

const QuestionBox = styled.div`
  grid-row: 2/3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div<ThemeSet>`
  font-size: 1.2rem;
  margin-bottom: 2rem;

  @media ${(props) => props.tablet} {
    font-size: 1.7rem;
  }

  @media ${(props) => props.desktop} {
    font-size: 1.7rem;
  }
`;

const BtnContainer = styled.div`
  grid-row: 3/5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.button<ThemeSet>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 25px;
  width: 11rem;
  height: 2.5rem;
  font-size: 1rem;
  margin: 1rem;
  :hover {
    color: white;
    background-color: #1a237e;
    font-weight: bold;
  }

  @media ${(props) => props.tablet} {
    width: 15rem;
    height: 2.9rem;
    font-size: 1rem;
  }

  @media ${(props) => props.desktop} {
    width: 15rem;
    height: 2.9rem;
    font-size: 1rem;
  }
`;

export type QuestionProps = {
  curOrder: number;
  orderLen: number;
  handleChoice: (num: number) => void;
};

export type ProBar = {
  width: string;
  back: string;
};

export default function Question({
  curOrder,
  orderLen,
  handleChoice,
}: QuestionProps): JSX.Element {
  const [qt, setQt] = useState<QuestionSet>(
    questionList.find((e) => e.id === curOrder) as QuestionSet
  );
  const [asOrder, setASOrder] = useState<number[]>(
    makeOrder(
      Array.from({ length: Object.keys(qt.answer).length }, (_, i) => i + 1)
    )
  );

  const [curProgress, setCurProgress] = useState<ProBar>({
    width: "33%",
    back: "#fb8c00",
  });

  useEffect(() => {
    setQt(questionList.find((e) => e.id === curOrder) as QuestionSet);
  }, [curOrder]);

  useEffect(() => {
    setASOrder(
      makeOrder(
        Array.from({ length: Object.keys(qt.answer).length }, (_, i) => i + 1)
      )
    );
  }, [qt]);

  let check: ProBar;

  useEffect(() => {
    if (orderLen === 3) {
      check = { width: "33%", back: "#fb8c00" };
    }
    if (orderLen === 2) {
      check = { width: "66%", back: "#ffeb3b" };
    }
    if (orderLen === 1) {
      check = { width: "100%", back: "#76ff03" };
    }
    setCurProgress(check);
  }, [orderLen]);

  return (
    <QuestionContainer {...theme}>
      <ProgressBarContainer>
        <Number>
          {orderLen !== 0 ? `${3 - (orderLen - 1)} / 3` : "3 / 3"}
        </Number>
        <Progress {...theme}>
          <ProgressBar {...curProgress}></ProgressBar>
        </Progress>
      </ProgressBarContainer>
      <QuestionBox>
        <h1>Q.</h1>
        <Text {...theme}>{qt?.question}</Text>
      </QuestionBox>
      <BtnContainer>
        {asOrder.map((curOrder: number, i: number) => (
          <Btn {...theme} key={i} onClick={() => handleChoice(curOrder)}>
            {qt?.answer[curOrder]}
          </Btn>
        ))}
      </BtnContainer>
    </QuestionContainer>
  );
}
