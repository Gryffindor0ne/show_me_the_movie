import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../components/Loading";

const Section = styled.section`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  width: 60vw;
  height: 80vh;
  margin: 100px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  background-size: 5px 5px;
  background-image: linear-gradient(to right, #eeeeee 1px, transparent 1px),
    linear-gradient(to bottom, #eeeeee 1px, transparent 1px);
`;

const Poster = styled.div`
  display: flex;
`;

const MovieContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  margin: 2rem;
`;

const MovieDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 1rem;
`;

const LinkBox = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const Link = styled.span`
  display: flex;
  position: relative;
  cursor: pointer;
  margin: 0.2rem;
  padding: 0.2em 0;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.2em;
    background-color: #1a237e;
    opacity: 0;
    transition: opacity 300ms, transform 300ms;
  }
  &::after {
    opacity: 1;
    transform: scale(0);
    transform-origin: center;
  }
  &:hover::after,
  :focus::after {
    transform: scale(1);
    color: #1a237e;
  }
`;

const Btn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 25px;
  color: white;
  background: #2196f3;
  font-size: 1.2rem;
  width: 12rem;
  height: 2.5rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0px 3px 3px 1px black;
  :hover {
    background: #1a237e;
  }
`;

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
  console.log(title, pubDate, country);

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const getData = await axios.get(`/v1/search/movie.json`, {
          params: {
            query: title,
            display: 50,
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
      setTimeout(() => setIsLoading(false), 1500);
    };
    getMovieData();
  }, [key]);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Section>
          <Poster>
            <img src={movieInfo?.image} />
          </Poster>
          <MovieContent>
            <TitleBox>
              <h1>{title}</h1>
              <h3>{movieInfo?.subtitle}</h3>
            </TitleBox>
            <MovieDetail>
              <h3>
                배우 : {movieInfo?.actor.split("|").join(", ").slice(0, -2)}
              </h3>
              <h3>감독 : {movieInfo?.director.split("|").slice(0, -1)}</h3>
              <h3>개봉연도 : {movieInfo?.pubDate}</h3>
              <h3>관객 평점 : {movieInfo?.userRating}</h3>
            </MovieDetail>
            <LinkBox>
              <Link>
                <a href={movieInfo?.link} target="_blank" rel="noreferrer">
                  상세 페이지
                </a>
              </Link>
            </LinkBox>
          </MovieContent>
          <Btn
            onClick={() => {
              navigate("/");
            }}
          >
            <span>다른 영화 보기</span>
          </Btn>
        </Section>
      )}
    </>
  );
}
