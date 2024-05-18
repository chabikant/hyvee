"use client"

import { useState } from 'react';
import axios from 'axios';
import NameForm from './name';
import { getName } from 'country-list';

export default function Home() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInfo = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const [ageRes, genderRes, nationalityRes] = await Promise.all([
        axios.get(`https://api.agify.io`, { params: { name } }),
        axios.get(`https://api.genderize.io`, { params: { name } }),
        axios.get(`https://api.nationalize.io`, { params: { name } }),
      ]);

      setInfo({
        name,
        age: ageRes.data.age,
        gender: genderRes.data.gender,
        country:nationalityRes.data.country.sort(
          (a, b) => b.probability - a.probability
        ),
      });
    } catch (error) {
      console.error('Error fetching data', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInfo(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Guess Info App</h1>
      <NameForm onSubmit={fetchInfo} onClear={handleClear} />
      {loading && (
        <div className="mt-8 p-4 border rounded-md shadow-md bg-gray-100">
          Loading...
        </div>
      )}
      {error && (
        <div className="mt-8 p-4 border rounded-md shadow-md bg-red-100">
          {error}
        </div>
      )}
      {info && (
        <div className="mt-8 p-4 border rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Results for {info.name}</h2>
          <p><strong>Age:</strong> {info.age}</p>
          <p><strong>Gender:</strong> {info.gender}</p>
          <p><strong>Nationalities:</strong> 
          <ul className="list-disc list-inside mt-2 space-y-1">
              {info.country.map((country, index) => (
                <li key={index} className="text-lg">
                  {getName(country.country_id)} <span className="text-black-700">({(country.probability * 100).toFixed(2)}%)</span>
                </li>
              ))}
            </ul>
          </p>
        </div>
      )}
    </div>
  );
}
