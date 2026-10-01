import { Routes, Route, useLocation } from "react-router";
import HomePage from "./pages/HomePage";
import QuestionPage from "./pages/QuestionPage";
import ResultPage from "./pages/ResultPage";
import Layout from "./components/Layout";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions/:id" element={<QuestionPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Route>
    </Routes>
  );
}

export default App;
