import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../components/Loading";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";

const OuterContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  width: 60vw;
  height: 80vh;
  margin: 100px;
  margin-left: auto;
  margin-right: auto;
  background-color: skyblue;
  background-size: 5px 5px;
  background-image: linear-gradient(to right, #eeeeee 1px, transparent 1px),
    linear-gradient(to bottom, #eeeeee 1px, transparent 1px);
  /* background: linear-gradient(to left, #d7dde8, #757f9a); */
`;

const InnerContainer = styled.section`
  margin: 1rem;
  display: grid;
  grid-gap: 1.5rem;
  grid-template-rows: repeat(3, 8rem);
  grid-template-columns: repeat(3, 17rem);
`;

const Header = styled.div`
  grid-column: 1/4;
  grid-row: 1/2;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 0.8rem;
  border-top: 5px solid #1e88e5;
  background-color: white;
  box-shadow: 5px 5px 20px #6d6b6b6b;
`;

const TitleBox = styled.div`
  grid-column: 1/3;
  grid-row: 1/2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainTitle = styled.span`
  font-size: 2.5rem;
`;

const Poster = styled.div`
  grid-column: 1/2;
  grid-row: 2/4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  box-shadow: 5px 5px 20px #6d6b6b6b;
  border-top: 5px solid #1e88e5;
  background-color: white;
`;
const MovieDetail = styled.div`
  grid-column: 2/4;
  grid-row: 2/4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 1rem;
  border-radius: 0.8rem;
  box-shadow: 5px 5px 20px #6d6b6b6b;
  border-top: 5px solid #1e88e5;
  background-color: white;
  padding-left: 2rem;
`;

const RatingBox = styled.div`
  display: flex;
`;
const StarRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1e88e5;
  font-size: 1.2rem;
  margin-left: 1rem;
  margin-bottom: 0.8rem;
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

const Contents = styled.h3`
  font-family: "EliceDigitalBaeum_Regular";
  margin-bottom: 0.8rem;
`;

const BtnContainer = styled.div`
  grid-column: 1/4;
  grid-row: 4/5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 25px;

  background: linear-gradient(to left, #b5c4df, #30498e);
  font-size: 1.2rem;
  width: 12rem;
  height: 2.5rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0px 3px 3px 1px black;
  :hover {
    background: #30498e;
    color: white;
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

  const star = [<IoMdStar />, <IoMdStarHalf />];
  const rating: number = Math.round(+(movieInfo?.userRating ?? "") * 1);
  console.log(rating);

  const curStar = [];
  for (let i = 1; i <= rating / 2; i++) {
    curStar.push(star[0]);
  }
  if (rating % 2 !== 0) {
    curStar.push(star[1]);
  }

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
        <OuterContainer>
          <InnerContainer>
            <Header>
              <TitleBox>
                <MainTitle>{title}</MainTitle>
                <h3>{movieInfo?.subtitle}</h3>
              </TitleBox>
              <Link>
                <a href={movieInfo?.link} target="_blank" rel="noreferrer">
                  더 자세한 정보를 원한다면
                </a>
              </Link>
            </Header>
            <Poster>
              <img src={movieInfo?.image} />
            </Poster>
            <MovieDetail>
              <Contents>
                배우 : {movieInfo?.actor.split("|").join(", ").slice(0, -2)}
              </Contents>
              <Contents>
                감독 : {movieInfo?.director.split("|").slice(0, -1)}
              </Contents>
              <Contents>개봉연도 : {movieInfo?.pubDate}</Contents>
              <RatingBox>
                <Contents>관객 평점 : {movieInfo?.userRating}</Contents>
                <StarRating>{curStar.map((star) => star)}</StarRating>
              </RatingBox>
            </MovieDetail>
            <BtnContainer>
              <Btn
                onClick={() => {
                  navigate("/");
                }}
              >
                <span>다른 영화 보기</span>
              </Btn>
            </BtnContainer>
          </InnerContainer>
        </OuterContainer>
      )}
    </>
  );
}
