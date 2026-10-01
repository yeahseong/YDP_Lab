import { usePostDataStore } from "../../store/usePostDataStore";
import Total from "../Total";

const SubQuestionList = ({
  currentQuestion,
  handleNextPage,
  handlePrevPage,
}) => {
  const { postData, setPostData } = usePostDataStore();
  const { subQuestions } = currentQuestion;

  const isRequireTotal = () => {
    return currentQuestion.category === "leisureRate" ? true : false;
  };

  const isDisabledNextBtn = () => {
    if (currentQuestion.category === "avgLeisureTime") {
      return subQuestions.every((q) => {
        const value = postData[q.category];
        return value !== "" && value !== null && value >= 0 && value <= 24;
      });
    } else {
      const sum = subQuestions.reduce((acc, q) => {
        const value = Number(postData[q.category]) || 0;
        return acc + value;
      }, 0);

      return sum === 100;
    }
  };

  return (
    <>
      <div>
        <h2 className="text-[18px] py-3 font-bold">
          <p>{currentQuestion.title}</p>
          {isRequireTotal() && <Total />}
        </h2>
        <ul className="flex flex-col gap-3">
          {subQuestions.map((question) => (
            <li key={question.category} className="flex flex-col gap-3">
              <label className="font-bold text-[16px]">{question.title}</label>
              <input
                type="number"
                value={postData[question.category]}
                onChange={(e) => setPostData(question.category, e.target.value)}
                placeholder={question.placeholder}
                className="focus:outline-blue-400 bg-gray-200 w-full py-2 px-4"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between mt-auto pt-4">
        <button
          onClick={handlePrevPage}
          className="px-4 py-2 cursor-pointer border border-gray-200 disabled:bg-gray-200"
        >
          이전
        </button>
        <button
          onClick={handleNextPage}
          disabled={!isDisabledNextBtn()}
          className="px-4 py-2 cursor-pointer border border-gray-200 disabled:bg-gray-200"
        >
          다음
        </button>
      </div>
    </>
  );
};

export default SubQuestionList;
