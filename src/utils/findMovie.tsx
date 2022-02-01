import { movieList, MovieSet } from "../static/movieList";

type answerSet = {
  [key: number]: number;
};

export const findMovie = (answer: answerSet) => {
  console.log(answer);
  const country = answer[1];
  const genre = answer[2] - 1;
  const like = answer[3] - 1;
  const targetList = movieList.find(
    (movie) => movie.id === country
  ) as MovieSet;
  return targetList["movies"][like][genre];
};
