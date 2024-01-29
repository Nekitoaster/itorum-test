import { useRoutes } from "react-router-dom";
import Header from "./components/global/Header";
import MainPage from "./pages/MainPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import ResultPage from "./pages/ResultPage";
import ComicsPage from "./pages/ComicsPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/comics" element={<ResultPage />} />
        <Route path="/comics/:id" element={<ComicsPage />} />
      </Routes>
    </>
  );
}

export default App;
