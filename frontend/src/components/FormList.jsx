import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FormList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/forms`
      );
      const data = await response.json();
      setForms(data);
    };
    fetchForms();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Available Forms
      </h2>
      <ul className="space-y-2">
        {forms.map((form) => (
          <li
            key={form.id}
            className="border p-4 rounded flex items-center justify-between shadow-sm hover:shadow-md transition"
          >
            <span>{form.title}</span>
            <Link
              to={`/fill/${form.id}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
            >
              Fill Survey
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormList;
