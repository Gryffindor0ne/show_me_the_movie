import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Question from "../components/Question";
import { findMovie } from "../utils/findMovie";
import { makeOrder } from "../utils/makeOrder";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
`;

type Selected = {
  [key: number]: number;
};

export default function QuestionView() {
  const navigate = useNavigate();
  const answers: Selected = {};
  const [order, setOrder] = useState<number[]>(makeOrder([1, 2, 3]));
  const [curOrder, setCurOrder] = useState<number>(order[order.length - 1]);
  const [answer, setAnswer] = useState({});

  useEffect(() => {
    if (order.length !== 0) {
      const pick = order[order.length - 1];
      setCurOrder(pick);
    } else {
      const targetMovie = findMovie(answer);
      navigate(`/result/${targetMovie}`);
    }
  }, [order, answer]);

  const handleChoice = (num: number): void => {
    answers[curOrder] = num;

    order.pop();
    setAnswer({ ...answer, ...answers });
  };

  return (
    <Section>
      <Question
        curOrder={curOrder}
        orderLen={order.length}
        handleChoice={handleChoice}
      />
    </Section>
  );
}
