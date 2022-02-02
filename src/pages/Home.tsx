import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div>SHOW ME THE MOVIE</div>
      <div>지금 뭘 볼까? 고민하는 이 순간!</div>
      <div>내 최애 리스트 중에서</div>
      <div>지금 원하는 영화</div>
      <div>그 하나를 지금 골라봅시다!</div>
      <img src="cinema.svg" width="400" height="500"></img>
      <button
        onClick={() => {
          navigate("/question");
        }}
      >
        Let's go!
      </button>
    </>
  );
}
