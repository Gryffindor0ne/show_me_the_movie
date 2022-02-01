import React, { useEffect, useState } from "react";
import { makeOrder } from "../utils/makeOrder";
import { QuestionSet, questionList } from "../static/questionList";

export type QuestionProps = {
  curOrder: number;
  orderLen: number;
  handleChoice: (num: number) => void;
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
  console.log(`Q => curOrder::${curOrder}`);
  console.log(qt);
  console.log(asOrder);

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

  return (
    <>
      <h1>Q.</h1>
      <div>{qt?.question}</div>
      {asOrder.map((curOrder: number, i: number) => (
        <button key={i} onClick={() => handleChoice(curOrder)}>
          {qt?.answer[curOrder]}
        </button>
      ))}
    </>
  );
}
