import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, details });
    alert("Thank you for your feedback!");
    navigate("/dashboard");
  };

  return (
    <div className='constructors mt-18'> 
            <div className='wrapper text-lg font-bold text-gray-200 mb-4'>
                <h2 className="constructor-title">Constructors</h2>
            </div>
    <div className="p-6 max-w-2xl mx-auto border border-gray-700 rounded-lg shadow-md mt-8">
      <h1 className="text-xl font-bold mb-6 text-gray-200">Give Us Your Feedback</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-400">
            Short title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-gray-500 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            placeholder="Enter a title "
            required
          />
        </div>
        
        <div>
          <label htmlFor="details" className="block text-sm font-medium mb-1 text-gray-400">
            Details
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows="4"
            className="w-full text-gray-500  p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            placeholder="Any additional details..."
            required
          ></textarea>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-white  border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#FF8700] text-white rounded-md hover:bg-gray-100  hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Send Feedback
          </button>
        </div>
      </form>
    </div>
    </div>

  );
};

export default Feedback;