import ResultComponent from "frontend/components/ResultComponent/ResultComponent";
import ExplainComponentTwo from "frontend/components/ExplainationComponent/ExplainationComponent";
import IExplainationinterface from "../components/ExplainationComponent/IExplainationInterface"
import data from "../components/testData";



// const data  ={test : 
//   [
//       {
//           _id: 9791166092824, // 기존 image 값으로 변경
//           title: "개념+연산 라이트 초등 수학 5-2(2024)",
//           author: "비상교육",
//           publisher: "비상교육",
//           genre: "초등 참고서",
//           price: 8550,
//           explanation: "이 책은 개념+연산 라이트 초등 수학 도서이며 기초력 완성과 개념 기억력 강화, 연산 능력 강화 등의 특징 등이 있습니다. 기초적이고 전반적인 내용을 확인할 수 있도록 구성했습니다.",
//           stock: 45 // 임의의 정수 값
//       },
//       {
//           _id: 9788926164273, // 기존 image 값으로 변경
//           title: "디딤돌 초등 수학 기본 + 응용 2-2 (2024)",
//           author: "디딤돌",
//           publisher: "디딤돌",
//           genre: "초등 참고서",
//           price: 15300,
//           explanation: "2024년 초등학교 1~2학년부터 적용되는 22개정 교육과정을 반영하여 출간된 교재입니다.",
//           stock: 62 // 임의의 정수 값
//       },
//       {
//           _id: 9791169403542, // 기존 image 값으로 변경
//           title: "개념+유형 기본라이트 초등 수학 5-2 (2024)",
//           author: "비상교육",
//           publisher: "비상교육",
//           genre: "초등 참고서",
//           price: 14400,
//           explanation: "유형 복습 시스템으로 기본실력 완성! [개념책]의 문제를 [복습책]에서 복습하여 유형을 정복하는 시스템",
//           stock: 37 // 임의의 정수 값
//       },
//       {
//           _id: 9791169518574, // 기존 image 값으로 변경
//           title: "암산천재 계산법 기적의 사칙연산",
//           author: "고스키 타쿠야",
//           publisher: "로그인",
//           genre: "초등 참고서",
//           price: 11700,
//           explanation: "도쿄대 출신 인기 수학강사가 알려주는 사칙연산의 비밀! 계단을 한 칸씩 오르듯 즐기며 익히는 '스몰 스텝 학습법'으로 수학이 즐거워진다!",
//           stock: 50 // 임의의 정수 값
//       },
//       {
//           _id: 9791163032038, // 기존 image 값으로 변경
//           title: "바쁜 초등학생을 위한 빠른 시계와 시간",
//           author: "강 난영",
//           publisher: "이지스에듀",
//           genre: "초등 참고서",
//           price: 10800,
//           explanation: "초등학생이 어려워하는 시계와 시간을 한 권에 모았어요!",
//           stock: 80 // 임의의 정수 값
//       }
//   ]
// }
const searchPage = () => {
  

  return (
    <div id="root">
      {/* <ResultComponent textNode={"데이터데이터"} className={"dmddo"} /> */}
      <ExplainComponentTwo test={data.test} />
    </div>
  );
};

export default searchPage