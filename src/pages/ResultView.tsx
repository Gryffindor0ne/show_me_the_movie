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
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
`;

const InnerContainer = styled.section`
  margin: 1rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: repeat(3, 9rem);
  grid-template-columns: repeat(3, 17rem);
  border-radius: 0.8rem;
  border-top: 10px solid #009688;
  background-color: white;
  box-shadow: 5px 5px 20px #6d6b6b6b;
  background-size: 6px 6px;
  background-image: linear-gradient(to right, #eeeeee 1px, transparent 1px),
    linear-gradient(to bottom, #eeeeee 1px, transparent 1px);
`;

const Header = styled.div`
  grid-column: 1/4;
  grid-row: 1/2;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const TitleBox = styled.div`
  grid-column: 1/3;
  grid-row: 1/2;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 4px solid #009688;
  margin-top: 2rem;
  padding-bottom: 0.4rem;
`;

const MainTitle = styled.span`
  font-size: 2.5rem;
  margin-bottom: 0rem;
`;

const Poster = styled.div`
  grid-column: 1/2;
  grid-row: 2/4;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5rem;
`;

const PosterImg = styled.img`
  border-radius: 0.8rem;
  width: 11rem;
  height: 14rem;
`;
const MovieDetail = styled.div`
  grid-column: 2/4;
  grid-row: 2/4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 1rem;
  padding-left: 3rem;
  padding-right: 5rem;
`;

const RatingBox = styled.div`
  display: flex;
`;
const StarRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffa578;
  font-size: 1.5rem;
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
    background-color: #009688;
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
    color: #009688;
  }
`;

const Contents = styled.h3`
  font-family: "EliceDigitalBaeum_Regular";
  color: #8d6e63;
  margin-bottom: 0.8rem;
`;

const SmallImageContainer = styled.div`
  grid-column: 1/2;
  grid-row: 4/5;
`;

const SmallImg = styled.img`
  cursor: pointer;
  width: 10rem;
  height: 6rem;
  border: none;
  margin-bottom: 1.5rem;
  margin-left: 6rem;
`;

const BtnContainer = styled.div`
  grid-column: 2/3;
  grid-row: 4/5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 1rem;
`;

const Btn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 25px;
  background: #009688;
  color: black;

  font-size: 1.2rem;
  width: 12rem;
  height: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0px 3px 3px 1px black;
  :hover {
    background: #1a237e;
    color: white;
    font-weight: bold;
  }
`;

const ImageContainer = styled.div`
  grid-column: 3/4;
  grid-row: 3/5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  display: flex;
  width: 16rem;
  height: 18rem;
  padding-right: 1rem;
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
  const rating: number = Math.round(parseInt(movieInfo?.userRating ?? "0"));
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

  const copyClipBoard = () => {
    const copyUrl = document.location.href;
    navigator.clipboard
      .writeText(`${copyUrl}`)
      .then(() => {
        alert("링크가 복사되었습니다!");
      })
      .catch(() => {
        alert("링크 복사가 실패하였습니다!");
      });
  };

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
            </Header>
            <Poster>
              <PosterImg src={movieInfo?.image} />
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
                <StarRating>
                  {curStar.map((star, idx) => (
                    <span key={idx}>{star}</span>
                  ))}
                </StarRating>
              </RatingBox>
              <Link>
                <a href={movieInfo?.link} target="_blank" rel="noreferrer">
                  더 자세한 정보를 원한다면
                </a>
              </Link>
            </MovieDetail>
            <SmallImageContainer>
              <SmallImg src="../video_files.svg" />
            </SmallImageContainer>
            <BtnContainer>
              <Btn
                onClick={() => {
                  navigate("/");
                }}
              >
                <span>테스트 다시하기</span>
              </Btn>
              <Btn
                onClick={() => {
                  copyClipBoard();
                }}
              >
                <span>링크 저장하기</span>
              </Btn>
            </BtnContainer>
            <ImageContainer>
              <Image src="../Film_rolls.svg" />
            </ImageContainer>
          </InnerContainer>
        </OuterContainer>
      )}
    </>
  );
}
