import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import FormBuilder from "./components/FormBuilder";
import FormList from "./components/FormList";
import FormFiller from "./components/FormFiller";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Form Builder</h1>
          <nav className="space-x-4">
            <Link
              to="/"
              className="text-sm text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="text-sm text-gray-700 hover:text-blue-600 font-medium"
            >
              Create Form
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<FormList />} />
          <Route path="/create" element={<FormBuilder />} />
          <Route path="/fill/:id" element={<FormFiller />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
