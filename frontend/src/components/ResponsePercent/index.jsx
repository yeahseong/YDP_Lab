import { usePostDataStore } from "../../store/usePostDataStore";

const ResponsePercent = ({ total, currentQuestionIndex }) => {
  const { postData } = usePostDataStore();

  const answeredQuestions = [
    postData.householdIncome,
    postData.leisurePurpose,
    postData.leisurePurpose2,
    postData.weekdayAvgLeisureTime && postData.weekendAvgLeisureTime,
    postData.restRecreationRate &&
      postData.hobbyRate &&
      postData.selfImprovementRate &&
      postData.socialRelationshipRate,
    postData.leisureActivity1,
    postData.leisureActivity2,
    postData.leisureActivity3,
    postData.leisureActivity4,
    postData.leisureActivity5,
  ];

  const responseCount = answeredQuestions.filter(
    (value) => value !== null && value !== undefined && value !== ""
  ).length;
  const percentNumber = (responseCount / total) * 100;

  return (
    <header>
      <div className="flex justify-between">
        <h1 className="font-bold text-blue-400">나와 닮은 동물은?</h1>
        <p className="text-gray-400">
          질문 {currentQuestionIndex} / {total}
        </p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden my-4">
        <div
          className="bg-blue-500 h-full text-white text-sm flex items-center justify-center transition-all duration-500 ease-in-out"
          style={{ width: `${percentNumber}%` }}
        >
          {percentNumber === 0 ? "" : `${percentNumber}%`}
        </div>
      </div>
    </header>
  );
};

export default ResponsePercent;
