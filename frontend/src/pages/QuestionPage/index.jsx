import { useNavigate, useParams } from "react-router";
import Container from "../../components/Container";
import ResponsePercent from "../../components/ResponsePercent";
import mockData from "../../mock.json";
import QuestionList from "../../components/QuestionList";
import SubQuestionList from "../../components/SubQuestionList";
import { usePostDataStore } from "../../store/usePostDataStore";
import { useEffect } from "react";
import { usePostQuestionsQuery } from "../../hooks/usePostQuestionsQuery";

const QuestionPage = () => {
  const { postData } = usePostDataStore();
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const { questions } = mockData;
  const total = questions.length;
  const currentQuestion = questions[id - 1];
  const { mutate: postQuestions } = usePostQuestionsQuery();

  const handleNextPage = () => {
    const nextId = Number(id) + 1;
    navigate(`/questions/${nextId}`);
  };

  const handlePrevPage = () => {
    const prevId = Number(id) - 1;
    navigate(`/questions/${prevId}`);
  };

  const handleSubmit = () => {
    postQuestions(postData);
  };

  useEffect(() => {
    console.log(postData);
  }, [postData]);
  return (
    <Container className="flex flex-col ">
      <ResponsePercent currentQuestionIndex={id} total={total} />

      {currentQuestion.subQuestions ? (
        <SubQuestionList
          currentQuestion={currentQuestion}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      ) : (
        <QuestionList
          currentQuestion={currentQuestion}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          handleSubmit={handleSubmit}
          currentId={id}
        />
      )}
    </Container>
  );
};

export default QuestionPage;
