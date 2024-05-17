"use client";

import { useState } from 'react';
import axios from 'axios';
import NameForm from './name';

export default function Home() {
  const [info, setInfo] = useState(null);

  const fetchInfo = async (name) => {
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
        country: nationalityRes.data.country,
      });
    } catch (error) {
      console.error('Error fetching data', error);
      setInfo(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Guess Info App</h1>
      <NameForm onSubmit={fetchInfo} />
      {info && (
        <div className="mt-8 p-4 border rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Results for {info.name}</h2>
          <p><strong>Age:</strong> {info.age}</p>
          <p><strong>Gender:</strong> {info.gender}</p>
          <p><strong>Nationalities:</strong> {info.country.map(c => c.country_id).join(', ')}</p>
        </div>
      )}
    </div>
  );
}
