import { usePostDataStore } from "../../store/usePostDataStore";

const Total = () => {
  const { postData } = usePostDataStore();

  const total =
    Number(postData.restRecreationRate ?? 0) +
    Number(postData.hobbyRate ?? 0) +
    Number(postData.selfImprovementRate ?? 0) +
    Number(postData.socialRelationshipRate ?? 0);

  return (
    <div className="text-gray-400">
      <p>{total} / 100</p>
    </div>
  );
};

export default Total;
