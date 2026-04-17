"use client";
import { useState } from "react";

export default function Home() {
  const [homePrice, setHomePrice] = useState(0);
  const [rent, setRent] = useState(0);
  const [result, setResult] = useState("");

  const calculate = () => {
    const monthlyMortgage = homePrice * 0.005;
    if (monthlyMortgage < rent) {
      setResult("Buying may be cheaper monthly.");
    } else {
      setResult("Renting may be cheaper monthly.");
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-4">
        Rent vs Buy Calculator
      </h1>

      <input
        type="number"
        placeholder="Home Price"
        className="border p-2 mr-2 mb-2"
        onChange={(e) => setHomePrice(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Monthly Rent"
        className="border p-2 mr-2 mb-2"
        onChange={(e) => setRent(Number(e.target.value))}
      />

      <button
        onClick={calculate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>

      {result && <p className="mt-4 font-bold">{result}</p>}
    </main>
  );
}