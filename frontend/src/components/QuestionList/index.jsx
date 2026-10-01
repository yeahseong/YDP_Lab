import { useState } from "react";
import { usePostDataStore } from "../../store/usePostDataStore";
import Modal from "../Modal";
import { MAPPING } from "../../constants/MAPPING";

const QuestionList = ({
  currentQuestion,
  handleNextPage,
  handlePrevPage,
  currentId,
  handleSubmit,
}) => {
  const { postData, setPostData } = usePostDataStore();
  const { questions } = currentQuestion;
  const keyOfQuestions = Object.keys(questions);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const isDisabledNextBtn = () => {
    const { category } = currentQuestion;
    const value = postData[category];

    if (value === null || value === undefined || value === "") {
      return false;
    }

    return true;
  };

  const isDisabledSubmitBtn = () => {
    const valueOfPostData = Object.values(postData);
    return !valueOfPostData.every(
      (value) => value !== null && value !== "" && value !== undefined
    );
  };
  return (
    <>
      <div>
        <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
          {MAPPING}
        </Modal>
        <div>
          <h2 className="text-[18px] py-3 font-bold">
            {currentQuestion.title}
          </h2>
        </div>
        <ul className="flex flex-col gap-3">
          {keyOfQuestions.map((key) => (
            <li key={questions[key]}>
              <button
                onClick={() =>
                  setPostData(currentQuestion.category, questions[key])
                }
                className={`w-full text-left border border-gray-200 py-1 px-2 cursor-pointer ${
                  postData[currentQuestion.category] === questions[key]
                    ? "bg-blue-400 text-white transition"
                    : ""
                }`}
              >
                {key}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between mt-auto pt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentId === "1"}
          className="px-4 py-2 cursor-pointer border border-gray-200 disabled:bg-gray-200"
        >
          이전
        </button>
        {currentId == 10 ? (
          <button
            onClick={handleSubmit}
            disabled={isDisabledSubmitBtn()}
            className="px-4 py-2 cursor-pointer border border-gray-200 disabled:bg-gray-200"
          >
            제출
          </button>
        ) : (
          <button
            onClick={handleNextPage}
            disabled={!isDisabledNextBtn()}
            className="px-4 py-2 cursor-pointer border border-gray-200 disabled:bg-gray-200"
          >
            다음
          </button>
        )}
      </div>
    </>
  );
};

export default QuestionList;
