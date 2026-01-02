export interface DictionaryItem {
  word: string;
  meaning: string;
  x: number; // vw 기준
  y: number; // vh 기준
  fontSize?: number;
  center?: boolean;
}

export const WORDS: DictionaryItem[] = [
  {
    word: "탐조",
    meaning: "새를 관찰하는 행위로, ‘버드 워칭'이라고도 한다",
    x: 50,
    y: 40,
    fontSize: 150,
    center: true,
  },
  // ===== 큰 글자(내부 링) =====
  {
    word: "유조",
    meaning: "어린 새",
    x: 50, // 오른쪽 위로 이동
    y: 20,
    fontSize: 80,
  },
  {
    word: "종추",
    meaning: "탐조인 개인이 그동안 관측한 적이 없는 종을 새로 관찰한 것을 의미",
    x: 35,
    y: 25,
    fontSize: 80,
  },
  {
    word: "동정",
    meaning:
      "어떤 종인지 알 수 없는 생물을 어느 분류군에 속하는지 판별하는 과정",
    x: 65,
    y: 25,
    fontSize: 80,
  },
  {
    word: "성조",
    meaning: "어른 새",
    x: 50,
    y: 60,
    fontSize: 80,
  },
  {
    word: "철새",
    meaning: "계절에 따라 번식지와 월동지를 오가는 새",
    x: 35,
    y: 55,
    fontSize: 80,
  },
  {
    word: "텃새",
    meaning: "한 지역에 1년 내내 살면서 이동하지 않는 새",
    x: 65,
    y: 55,
    fontSize: 80,
  },
  {
    word: "나그네새",
    meaning: "번식지나 월동지로 이동하는 도중에 잠시 우리나라를 거쳐 가는 새",
    x: 25,
    y: 40,
    fontSize: 80,
  },
  {
    word: "길잃은새",
    meaning:
      "원래 지나가던 길이나 살던 곳을 벗어나 엉뚱한 곳에서 나타난 새. '미조'라고도 하며, 태풍이 부는 시기나 많은 새들이 이동하는 봄철과 가을철에 주로 나타남",
    x: 75,
    y: 40,
    fontSize: 80,
  },

  // ===== 작은 글자(외곽 링) =====
  {
    word: "버드 피딩",
    meaning:
      "새에게 먹이를 주는 행위로, 새와 서식지 보호를 위해 신중하게 접근해야 한다",
    x: 22, // 오른쪽으로 이동
    y: 27,
    fontSize: 50,
  },

  {
    word: "이소",
    meaning: "어린 새가 둥지를 떠나 야외생활을 시작하는 과정",
    x: 70,
    y: 67,
    fontSize: 50,
  },
  {
    word: "탁란",
    meaning:
      "뻐꾸기, 일부 오리 등의 조류에서, 어미가 다른 개체의 둥지에 자신의 알을 낳는 행위",
    x: 34,
    y: 13,
    fontSize: 50,
  },
  {
    word: "깃갈이",
    meaning: "새가 낡은 깃털을 새 깃털로 바꾸는 현상",
    x: 64,
    y: 13,
    fontSize: 50,
  },
  {
    word: "월동지",
    meaning: "철새가 겨울을 나는 곳",
    x: 48, // 살짝 오른쪽
    y: 10,
    fontSize: 50,
  },
  {
    word: "우점종",
    meaning: "한 지역에서 가장 흔하게 발견되는 새의 종류",
    x: 77,
    y: 24,
    fontSize: 50,
  },
  {
    word: "필드 스코프",
    meaning:
      "조류를 자세하게 관찰하기 위한 고배율 망원경으로, 주로 삼각대에 설치하여 사용한다",
    x: 79,
    y: 55,
    fontSize: 50,
  },
  {
    word: "탐조 포인트",
    meaning: "새들이 많이 발견되는 특정 장소",
    x: 40, // 아래쪽도 조금 오른쪽으로
    y: 70,
    fontSize: 50,
  },
  {
    word: "꼬리깃",
    meaning: "꼬리에 있는 깃털로, 비행 방향을 조절하는 데 도움을 준다",
    x: 23,
    y: 60,
    fontSize: 50,
  },
  {
    word: "횃대",
    meaning: "새가 앉아 있는 나뭇가지나 구조물",
    x: 60,
    y: 65,
    fontSize: 50,
  },
];
