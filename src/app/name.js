"use client";

import { useState } from 'react';

const NameForm = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      onSubmit(name);
      
      
    }
    setName("");
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
          className="mt-1 block w-full px-3 py-2 border-gray-600 rounded-md shadow-md focus:outline focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </label>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Guess Info
      </button>
    </form>
  );
};

export default NameForm;