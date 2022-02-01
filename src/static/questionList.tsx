export type QuestionSet = {
  id: number;
  question: string;
  answer: { [key: number]: string };
};

export const questionList: QuestionSet[] = [
  {
    id: 1,
    question: "어느 나라 영화를 원하세요?",
    answer: {
      1: "국내영화",
      2: "해외영화",
    },
  },
  {
    id: 2,
    question: "어떤 장르를 원하세요?",
    answer: {
      1: "로맨스",
      2: "액션",
      3: "드라마",
      4: "스릴러",
    },
  },
  {
    id: 3,
    question: "영화 선택의 가장 주요한 기준은 어떤 건가요?",
    answer: {
      1: "감독",
      2: "작품성",
      3: "배우의 연기력",
      4: "스토리",
    },
  },
];
