export type MovieSet = {
  id: number;
  movies: string[][];
};

export const movieList: MovieSet[] = [
  {
    id: 1,
    movies: [
      [
        "파이란_2001_KR",
        "암살_2015_KR",
        "지구를 지켜라_2003_KR",
        "장화,홍련_2003_KR",
      ],
      [
        "8월의 크리스마스_1998_KR",
        "아저씨_2010_KR",
        "기생충_2019_KR",
        "마더_2009_KR",
      ],
      ["연애소설_2002_KR", "신세계_2012_KR", "한공주_2013_KR", "곡성_2016_KR"],
      [
        "내 머리속의 지우개_2004_KR",
        "범죄의 재구성_2004_KR",
        "공동경비구역 JSA_2000_KR",
        "살인의 추억_2003_KR",
      ],
    ],
  },
  {
    id: 2,
    movies: [
      ["노팅힐_1999", "매드맥스_2015", "파고_1996", "식스센스_1999"],
      [
        "조제,호랑이 그리고 물고기들_2003",
        "밀리언달러 베이비_2004",
        "타인의 삶_2006",
        "파이트클럽_1999",
      ],
      [
        "실버라이닝 플레이북_2012",
        "레옹_1994",
        "폭스캐처_2014",
        "유주얼 서스펙트_1995",
      ],
      [
        "이터널 선샤인_2004",
        "본 아이덴티티_2002",
        "필라델피아_1993",
        "폰부스_2002",
      ],
    ],
  },
];
