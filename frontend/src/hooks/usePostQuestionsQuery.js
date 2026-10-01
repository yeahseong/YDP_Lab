import { useMutation } from "@tanstack/react-query";
import instance from "../api/instance";
import { useNavigate } from "react-router";

const postQuestions = (data) => {
  return instance.post("/questions", data);
};

export const usePostQuestionsQuery = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postQuestions,
    onSuccess: (res) => {
      navigate("/result", { state: res.data });
    },
  });
};
