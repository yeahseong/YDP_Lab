import { useLocation, useNavigate } from "react-router";
import Container from "../../components/Container";
import { usePostDataStore } from "../../store/usePostDataStore";
import { useState } from "react";
import Modal from "../../components/Modal";
import { initKakao, shareByKakaoTalk } from "../../kakao";

const ResultPage = () => {
  const location = useLocation();
  const result = location.state;
  const { resetPostData } = usePostDataStore();
  const navigate = useNavigate();
  const [modalContent, setModalContent] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleReset = () => {
    resetPostData();
    navigate("/");
  };

  const onClickDetail = (data) => {
    setModalContent(data);
    setIsOpenModal(true);
  };

  const handleClickShare = () => {
    try {
      initKakao();
      shareByKakaoTalk({
        name: result.animalName,
        animalType: result.animalType,
        description: result.description,
        imageURL: result.animalImageUrl,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(result);
  return (
    <Container className="flex flex-col items-center gap-4">
      <Modal onClose={() => setIsOpenModal(false)} isOpen={isOpenModal}>
        {typeof modalContent === "string" && <p>{modalContent}</p>}
        {typeof modalContent === "object" &&
          !Array.isArray(modalContent) &&
          modalContent !== null && (
            <div>
              <h3>{modalContent.subTitle}</h3>
              <p>{modalContent.content}</p>
              <h2 className="text-center text-[24px] p-4 font-bold">
                {"< 주요 지표 >"}
              </h2>
              {modalContent.metrics?.map((obj) => (
                <div className="">
                  <h3 className="font-bold py-2 text-[20px] text-blue-400">
                    {obj.subtitle}
                  </h3>
                  <p className="">{obj.content}</p>
                </div>
              ))}
            </div>
          )}
      </Modal>
      <div>
        <img src={result.animalImageUrl} alt="결과이미지" className="w-full" />
      </div>
      <h1 className="font-bold text-blue-400">{result.animalName}</h1>
      <h2 className="text-gray-400">{result.animalType}</h2>
      <p>{result.description}</p>
      <button
        onClick={() => onClickDetail(result.animalDescription)}
        className="w-full bg-yellow-200 p-2 border-1 cursor-pointer font-bold rounded-md"
      >
        {result.animal}는 어떤 동물일까요 ?
      </button>
      <button
        onClick={() => onClickDetail(result.typeDescriptoon)}
        className="w-full bg-yellow-200 p-2 border-1 cursor-pointer font-bold rounded-md"
      >
        나는 어떤 유형일까요?
      </button>
      <h3 className="font-bold">{"< 분석 리포트 >"}</h3>
      {result.analSummary.map((summary) => (
        <button
          onClick={() => onClickDetail(summary)}
          className="w-full bg-yellow-200 p-2 border-1 cursor-pointer font-bold rounded-md"
        >
          {summary.subtitle}
        </button>
      ))}
      <h3 className="font-bold">나만의 특성</h3>
      <div className="flex gap-4 flex-wrap">
        {result.interesting.map((tag) => (
          <span className="font-bold bg-green-200 px-2 py-1 rounded-md border-1">
            {tag}
          </span>
        ))}
      </div>

      <div className="w-full flex gap-4">
        <button
          onClick={handleReset}
          className="flex-1 cursor-pointer mt-2 bg-blue-200 p-2"
        >
          다시 테스트하기
        </button>
        <button
          onClick={handleClickShare}
          className="flex-1 cursor-pointer mt-2 bg-blue-200 p-2"
        >
          공유하기
        </button>
      </div>
    </Container>
  );
};

export default ResultPage;
