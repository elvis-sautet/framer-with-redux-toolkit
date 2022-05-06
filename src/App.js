import React from "react";
import { Route, Routes } from "react-router-dom";
import AddPost from "./components/AddPost";
import Layout from "./components/Layout";
import Posts from "./components/Posts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <div className="bg-gray-300">
              <Posts />
            </div>
          }
        />
        <Route path="add-new-post" element={<AddPost />} />

        {/* 404 */}
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}

export default App;
