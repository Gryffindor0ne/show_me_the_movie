import React from "react";
import { useParams } from "react-router-dom";

export default function ResultView() {
  const { key } = useParams();

  return (
    <>
      <div>결과</div>
      <h1>{key}</h1>
    </>
  );
}
