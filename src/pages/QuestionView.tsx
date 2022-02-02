import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../components/Question";
import { findMovie } from "../utils/findMovie";
import { makeOrder } from "../utils/makeOrder";

type Selected = {
  [key: number]: number;
};

export default function QuestionView() {
  const navigate = useNavigate();
  const answers: Selected = {};
  const [order, setOrder] = useState<number[]>(makeOrder([1, 2, 3]));
  const [curOrder, setCurOrder] = useState<number>(order[order.length - 1]);
  const [answer, setAnswer] = useState({});

  // console.log(`:::::order::::${order}`);
  // console.log(`:::::curOrder::::${curOrder}`);

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
    // console.log(`::::현재선택::::${JSON.stringify(answers)}`);
    order.pop();
    setAnswer({ ...answer, ...answers });
  };

  // console.log(`:::::선택모음::::${JSON.stringify(answer)}`);

  return (
    <>
      <Question
        curOrder={curOrder}
        orderLen={order.length}
        handleChoice={handleChoice}
      />
    </>
  );
}
