"use client";

import { useState } from 'react';

const NameForm = ({ onSubmit, onClear }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      onSubmit(name);
      
      
    }
    setName("");
  };

  const handleClear = () => {
    setName('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-white-700">Enter Name:</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-md focus:outline focus:ring-indigo-700 focus:border-indigo-500 sm:text-sm text-black"
        />
      </label>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Guess Info
      </button>
      <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center px-4 py-2 ml-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Clear
        </button>
    </form>
  );
};

export default NameForm;