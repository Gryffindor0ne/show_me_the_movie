import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../components/Loading";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";
import { theme, ThemeSet } from "../theme";

const OuterContainer = styled.section<ThemeSet>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin-left: auto;
  margin-right: auto;

  @media ${(props) => props.minimum} {
    min-height: 1000px;
  }
  @media ${(props) => props.mobile} {
    min-height: 1200px;
  }

  @media ${(props) => props.tablet} {
    min-height: 800px;
  }
  @media ${(props) => props.desktop} {
    height: 100vh;
  }
`;

const InnerContainer = styled.section<ThemeSet>`
  margin: 1rem;
  display: grid;
  grid-template-rows: repeat(7, 10rem);
  grid-template-columns: repeat(1, 19rem);
  border-radius: 0.8rem;
  border-top: 10px solid #009688;
  background-color: white;
  box-shadow: 5px 5px 20px #6d6b6b6b;
  background-size: 6px 6px;
  background-image: linear-gradient(to right, #eeeeee 1px, transparent 1px),
    linear-gradient(to bottom, #eeeeee 1px, transparent 1px);

  @media ${(props) => props.minimum} {
    grid-template-rows: repeat(6, 10rem);
    grid-template-columns: repeat(1, 16rem);
  }

  @media ${(props) => props.tablet} {
    grid-template-rows: repeat(3, 8rem);
    grid-template-columns: repeat(3, 15rem);
  }

  @media ${(props) => props.desktop} {
    grid-template-rows: repeat(3, 8rem);
    grid-template-columns: repeat(3, 17.5rem);
  }
`;

const Header = styled.div<ThemeSet>`
  grid-row: 1/2;
  grid-column: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${(props) => props.tablet} {
    grid-row: 1/2;
    grid-column: 1/4;
  }

  @media ${(props) => props.desktop} {
    grid-row: 1/2;
    grid-column: 1/4;
  }
`;

const TitleBox = styled.div<ThemeSet>`
  grid-row: 1/2;
  grid-column: 1/1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 4px solid #009688;
  padding-bottom: 0.4rem;

  > div {
    font-size: 2rem;
    margin-bottom: 0rem;
  }
  > h3 {
    color: #009688;
    font-size: 0.8rem;
  }

  @media ${(props) => props.tablet} {
    grid-row: 1/2;
    grid-column: 1/3;
    > div {
      font-size: 2.5rem;
      margin-bottom: 0rem;
    }
    > h3 {
      font-size: 1rem;
    }
  }

  @media ${(props) => props.desktop} {
    grid-row: 1/2;
    grid-column: 1/3;
    > div {
      font-size: 2.5rem;
      margin-bottom: 0rem;
    }
    > h3 {
      font-size: 1rem;
    }
  }
`;

const Poster = styled.div<ThemeSet>`
  grid-row: 2/3;
  grid-column: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    border-radius: 0.7rem;
    width: 8rem;
    height: 11rem;
  }

  @media ${(props) => props.tablet} {
    grid-row: 2/4;
    grid-column: 1/2;
    padding-left: 3rem;

    > img {
      width: 11rem;
      height: 14rem;
    }
  }

  @media ${(props) => props.desktop} {
    grid-row: 2/4;
    grid-column: 1/2;
    padding-left: 5rem;

    > img {
      width: 11rem;
      height: 14rem;
    }
  }
`;

const MovieDetail = styled.div<ThemeSet>`
  grid-row: 3/5;
  grid-column: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "EliceDigitalBaeum_Regular";
  color: #8d6e63;
  margin-top: 3rem;
  padding: 3.3rem;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > h4 {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.9rem;
      padding: 0.3rem;
    }
    > span {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.3rem;
      font-size: 0.8rem;
      padding: 0.2rem;
    }
  }

  @media ${(props) => props.tablet} {
    grid-row: 2/4;
    grid-column: 2/4;
    margin-top: 0rem;
    padding-left: 3rem;
    padding-right: 5rem;

    > div {
      display: flex;
      flex-direction: row;
      > h4 {
        display: flex;
        width: 6rem;
        font-size: 1rem;
        padding: 0.7rem;
      }
      > span {
        display: flex;
        align-items: center;
        margin-bottom: 0.1rem;
        font-size: 1rem;
        width: 16rem;
        padding: 0.5rem;
      }
    }
  }

  @media ${(props) => props.desktop} {
    grid-row: 2/4;
    grid-column: 2/4;
    padding-left: 3rem;
    padding-right: 5rem;

    > div {
      display: flex;
      flex-direction: row;
      > h4 {
        display: flex;
        width: 6rem;
        font-size: 1rem;
        padding: 0.7rem;
      }
      > span {
        display: flex;
        align-items: center;
        margin-bottom: 0.3rem;
        font-size: 1rem;
        width: 20rem;
        padding-left: 1.3rem;
        padding-right: 1.3rem;
      }
    }
  }
`;

const RatingBox = styled.div<ThemeSet>`
  display: flex;
  flex-direction: column;
  font-family: "EliceDigitalBaeum_Regular";
  color: #8d6e63;
  width: 7rem;
  height: 3.8rem;
  margin-top: 0.7rem;
  margin-bottom: 3rem;

  > div {
    display: flex;
    > h4 {
      display: flex;
      font-size: 0.8rem;
      padding: 0.3rem;
    }
    > span {
      display: flex;
      align-items: center;
      font-size: 0.75rem;
      padding: 0.3rem;
    }
  }

  @media ${(props) => props.tablet} {
    > div {
      display: flex;
      > h4 {
        display: flex;
        width: 6rem;
        font-size: 1rem;
        padding: 0.7rem;
      }
      > span {
        display: flex;
        align-items: center;
        margin-bottom: 0.1rem;
        font-size: 1rem;
        padding: 0.5rem;
      }
    }
  }

  @media ${(props) => props.desktop} {
    > div {
      display: flex;
      margin-top: 0.7rem;
      > h4 {
        display: flex;
        width: 6rem;
        font-size: 1rem;
        padding: 0.7rem;
      }
      > span {
        display: flex;
        align-items: center;
        margin-bottom: 0.1rem;
        font-size: 1rem;
        padding: 0.5rem;
      }
    }
  }
`;

const StarRating = styled.div<ThemeSet>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffa578;
  font-size: 1.1rem;
  padding: 0.2rem;

  @media ${(props) => props.tablet} {
    font-size: 1.2rem;
    width: 250px;
  }
  @media ${(props) => props.desktop} {
    font-size: 2rem;
    width: 320px;
  }
`;

const LinkBox = styled.div<ThemeSet>`
  grid-row: 5/6;
  grid-column: 1/1;
  display: flex;
  justify-content: center;
  /* align-items: center; */

  @media ${(props) => props.tablet} {
    grid-row: 4/5;
    grid-column: 1/4;
  }

  @media ${(props) => props.desktop} {
    grid-row: 4/5;
    grid-column: 1/4;
  }
`;

const Link = styled.div`
  display: flex;
  position: absolute;
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

const SmallImageContainer = styled.div<ThemeSet>`
  display: none;

  @media ${(props) => props.tablet} {
    grid-row: 5/6;
    grid-column: 1/2;
    display: block;
  }

  @media ${(props) => props.desktop} {
    grid-row: 5/6;
    grid-column: 1/2;
    display: block;
  }

  > img {
    width: 10rem;
    height: 6rem;
    border: none;
    margin-bottom: 1.5rem;
    margin-left: 6rem;

    @media ${(props) => props.tablet} {
      margin-bottom: 1.5rem;
      margin-left: 4rem;
    }

    @media ${(props) => props.desktop} {
      margin-top: 2rem;
      margin-left: 5rem;
    }
  }
`;

const BtnContainer = styled.div<ThemeSet>`
  grid-row: 7/8;
  grid-column: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 25px;
    background: #009688;
    color: black;
    margin-bottom: 1rem;
    font-size: 1rem;
    width: 10rem;
    height: 2.2rem;

    box-shadow: 0px 3px 3px 1px black;
    :hover {
      background: #1a237e;
      color: white;
      font-weight: bold;
    }
  }

  @media ${(props) => props.tablet} {
    grid-row: 5/6;
    grid-column: 2/3;
  }

  @media ${(props) => props.desktop} {
    grid-row: 5/6;
    grid-column: 2/3;
    > button {
      font-size: 1.2rem;
      width: 12rem;
      height: 2.5rem;
    }
  }
`;

const ImageContainer = styled.div<ThemeSet>`
  grid-row: 5/7;
  grid-column: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    display: flex;
    width: 14rem;
    height: 12rem;
    padding-right: 1rem;
  }

  @media ${(props) => props.tablet} {
    grid-row: 4/6;
    grid-column: 3/4;
    > img {
      display: flex;
      width: 15rem;
      height: 13rem;
      padding-right: 1rem;
    }
  }

  @media ${(props) => props.desktop} {
    grid-row: 4/6;
    grid-column: 3/4;
    > img {
      display: flex;
      width: 13rem;
      height: 15rem;
      margin-top: 3rem;
    }
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
  const rating: number = Math.round(+(movieInfo?.userRating ?? "0") * 1);
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
  }, [key, country, pubDate, title]);

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
        <OuterContainer {...theme}>
          <InnerContainer {...theme}>
            <Header {...theme}>
              <TitleBox {...theme}>
                <div>{title}</div>
                <h3>{movieInfo?.subtitle}</h3>
              </TitleBox>
            </Header>
            <Poster {...theme}>
              <img src={movieInfo?.image} alt={movieInfo?.subtitle} />
            </Poster>
            <MovieDetail {...theme}>
              <div>
                <h4>배우</h4>
                <span>
                  {movieInfo?.actor.split("|").join(", ").slice(0, -2)}
                </span>
              </div>
              <div>
                <h4>감독</h4>
                <span> {movieInfo?.director.split("|").slice(0, -1)}</span>
              </div>
              <div>
                <h4>개봉연도</h4>
                <span> {movieInfo?.pubDate}</span>
              </div>
              <RatingBox {...theme}>
                <div>
                  <h4>관객 평점</h4>
                  <span>{movieInfo?.userRating}</span>
                </div>
                <StarRating {...theme}>
                  {curStar.map((star, idx) => (
                    <h5 key={idx}>{star}</h5>
                  ))}
                </StarRating>
              </RatingBox>
            </MovieDetail>
            <LinkBox {...theme}>
              <Link>
                <a href={movieInfo?.link} target="_blank" rel="noreferrer">
                  더 자세한 정보를 원한다면
                </a>
              </Link>
            </LinkBox>
            <SmallImageContainer {...theme}>
              <img src="../video_files.svg" alt={"video_files"} />
            </SmallImageContainer>
            <BtnContainer {...theme}>
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                <span>테스트 다시하기</span>
              </button>
              <button
                onClick={() => {
                  copyClipBoard();
                }}
              >
                <span>링크 저장하기</span>
              </button>
            </BtnContainer>
            <ImageContainer {...theme}>
              <img src="../Film_rolls.svg" alt={"Film_rolls"} />
            </ImageContainer>
          </InnerContainer>
        </OuterContainer>
      )}
    </>
  );
}
