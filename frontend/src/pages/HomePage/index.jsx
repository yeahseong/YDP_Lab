import { useNavigate } from "react-router";
import Container from "../../components/Container";
import mockData from "../../mock.json";

const HomePage = () => {
  const { questions } = mockData;
  const navigate = useNavigate();

  return (
    <Container className="flex flex-col items-center gap-4 p-4">
      <img
        className="rounded-full w-40"
        src="https://lunlunneko-ydplab.hf.space/static/animals/greyheron.png"
        alt="꽹가리"
      />
      <h2 className="text-blue-400 font-bold text-[22px]">
        나의 동물 성격 찾기
      </h2>
      <h3>{questions.length}개의 질문을 통해 당신과 닮은 동물을 찾아보세요!</h3>
      <ul className="list-disc text-gray-400">
        <li>정확한 결과를 위해 솔직하게 답변해주세요</li>
        <li>약 2분 정도 소요됩니다</li>
      </ul>
      <button
        onClick={() => navigate("questions/1")}
        className="bg-blue-400 py-2 px-4 w-full text-white cursor-pointer rounded-md"
      >
        테스트 시작하기
      </button>
    </Container>
  );
};

export default HomePage;
