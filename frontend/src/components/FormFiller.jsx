import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FormFiller = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/forms/${id}`
      );
      const data = await response.json();
      setForm(data);
    };
    fetchForm();
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async () => {
    await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/forms/${id}/responses`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      }
    );
    setAnswers({});
    setShowSuccess(true);
    // alert removed for cleaner UX
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        {form.title}
      </h2>
      {form.questions.map((q) => (
        <div
          key={q.id}
          className="border border-gray-300 bg-white shadow-sm p-4 rounded space-y-2"
        >
          <label className="block font-medium mb-1">{q.label}</label>
          {q.type === "text" && (
            <input
              className="border p-2 w-full"
              type="text"
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
          {q.type === "dropdown" && (
            <select
              className="border p-2 w-full"
              onChange={(e) => handleChange(q.id, e.target.value)}
            >
              <option value="">Select an option</option>
              {q.options?.split(",").map((opt, index) => (
                <option key={index} value={opt.trim()}>
                  {opt.trim()}
                </option>
              ))}
            </select>
          )}
          {q.type === "file" && (
            <input
              className="border p-2 w-full"
              type="file"
              onChange={(e) => handleChange(q.id, e.target.files[0]?.name)}
            />
          )}
        </div>
      ))}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit Response
      </button>
      {showSuccess && (
        <div className="text-green-800 bg-green-50 border border-green-300 rounded p-3 mt-4 shadow-sm">
            Your response has been submitted!
        </div>
      )}
    </div>
  );
};

export default FormFiller;
