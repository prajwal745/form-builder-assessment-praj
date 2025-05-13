import React, { useState } from "react";

const FormBuilder = () => {
  const [formStatus, setFormStatus] = useState(null);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { label: "", type: "text", options: "" }]);
  };

  const handleSubmit = async () => {
    await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/forms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, questions }),
    });
    setTitle("");
    setQuestions([]);
    setFormStatus("success");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Create Form
      </h2>
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {questions.map((q, index) => (
        <div key={index} className="border p-4 rounded space-y-2">
          <input
            className="border p-2 w-full"
            type="text"
            placeholder="Question Label"
            value={q.label}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].label = e.target.value;
              setQuestions(newQuestions);
            }}
          />
          <select
            className="border p-2 w-full"
            value={q.type}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].type = e.target.value;
              setQuestions(newQuestions);
            }}
          >
            <option value="text">Text</option>
            <option value="dropdown">Dropdown</option>
            <option value="file">File Upload</option>
          </select>
          {q.type === "dropdown" && (
            <input
              className="border p-2 w-full"
              type="text"
              placeholder="Options (comma-separated)"
              value={q.options}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].options = e.target.value;
                setQuestions(newQuestions);
              }}
            />
          )}
        </div>
      ))}
      <div className="flex gap-2">
        {formStatus === "success" && (
          <div className="text-green-800 bg-green-50 border border-green-300 rounded p-3 shadow-sm">
            ✅ Form created successfully!
          </div>
        )}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          onClick={handleSubmit}
        >
          Create Form
        </button>
      </div>
    </div>
  );
};

export default FormBuilder;
