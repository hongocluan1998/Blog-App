import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { BlogList } from "./pages/blog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Error } from "./pages/error";
import { CreateBlog } from "./pages/blog/create";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog-add" element={<CreateBlog />} />
        <Route path="/blog-view/:blog_id/:isEdit" element={<CreateBlog />} />
        <Route path="/blog-edit/:blog_id/:isEdit" element={<CreateBlog />} />
        <Route path="/error" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
