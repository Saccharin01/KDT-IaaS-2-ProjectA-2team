import response from "./IExplainationInterface"

// 주석 처리된 ExplainComponent 제거 또는 주석 해제

// const ExplainComponent: React.FC<IExplaination> = ({ className, textNode, price, author, title }) => {
//   return (
//     <div className={className}>
//       <div>
//         <h3>{title}</h3>
//       </div>
//       <div>
//         <h4>{price}</h4>
//       </div>
//       <div>
//         <p>{author}</p>
//       </div>
//       <div>
//         <p>{textNode}</p>
//       </div>
//     </div>
//   );
// };

const ExplainComponentTwo: React.FC<response> = ({ test }) => {
  return (
      test.map((element, index) => (
        <div key={index}>
          <div>
            <h3>{element.title}</h3>
          </div>
          <div>
            <h4>{element.author}</h4>
          </div>
          <div>
            <p>{element.price}</p>
          </div>
          <div>
            <p>{element.explanation}</p>
          </div>
        </div>
      ))
  );
};

export default ExplainComponentTwo;
