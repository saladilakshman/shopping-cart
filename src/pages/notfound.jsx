import React from "react";
import { useNavigate } from "react-router-dom";
const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-1/3">
      <h3>Oop! page not found</h3>
      <br />
      <button
        className="px-2 py-1 bg-blue-400 text-white rounded-md capitalize inline-block"
        onClick={() => {
          navigate(-1);
        }}
      >
        back to home
      </button>
    </div>
  );
};

export default Notfound;
