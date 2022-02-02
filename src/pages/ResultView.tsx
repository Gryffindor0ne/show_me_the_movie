import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../components/Loading";

type MovieInfo = {
  actor: string;
  director: string;
  image: string;
  link: string;
  pubDate: string;
  subtitle: string;
  titie: string;
  userRating: string;
};

export default function ResultView() {
  const navigate = useNavigate();
  const { key } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movieInfo, setMovieInfo] = useState<MovieInfo | undefined>();

  // 중복요소 떄문에 구현
  const [title, pubDate, country] = key?.split("_") as string[];

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const getData = await axios.get(`/v1/search/movie.json`, {
          params: {
            query: title,
            display: 10,
            country: country,
          },
          headers: {
            "X-Naver-Client-Id": `${process.env.REACT_APP_NAVER_CLIENT_ID}`,
            "X-Naver-Client-Secret": `${process.env.REACT_APP_NAVER_CLIENT_SECRET}`,
          },
        });
        console.log(getData.data.items);

        // TODO item 타입 미리 정해두기
        console.log(
          getData.data.items.find((item: MovieInfo) => item.pubDate === pubDate)
        );

        if (getData.status === 200) {
          setMovieInfo(
            getData.data.items.find(
              (item: MovieInfo) => item.pubDate === pubDate
            )
          );
        } else {
          console.error("Inner Error");
        }
      } catch {
        console.error("Outer Error");
      }
      setIsLoading(false);
    };
    getMovieData();
  }, [key]);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div>결과</div>
          <h1>{title}</h1>
          <h3>부제 : {movieInfo?.subtitle}</h3>
          <h3>베우 : {movieInfo?.actor}</h3>
          <h3>감독 : {movieInfo?.director}</h3>
          <img src={movieInfo?.image} />
          <h3>개봉연도 : {movieInfo?.pubDate}</h3>
          <h3>관객 평점 : {movieInfo?.userRating}</h3>
          <a href={movieInfo?.link}>좀 더 자세한 사항은 이 링크로!</a>

          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <span>테스트 다시하기</span>
          </button>
        </>
      )}
    </>
  );
}
