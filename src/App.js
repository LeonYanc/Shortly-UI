import React, { useState } from "react";
import { Routes, Route, Router } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AddUrl from "./components/Urls/AddUrl";
import UrlLists from "./components/Urls/UrlLists";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
