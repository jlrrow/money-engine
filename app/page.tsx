"use client";
import { useState } from "react";

export default function Home() {
  const [homePrice, setHomePrice] = useState(0);
  const [rent, setRent] = useState(0);
  const [result, setResult] = useState("");

  const calculate = () => {
    const interestRate = 0.065 / 12;
    const loanTerm = 30 * 12;

    const downPayment = homePrice * 0.20;
    const loanAmount = homePrice - downPayment;

    const mortgage =
      (loanAmount *
        interestRate *
        Math.pow(1 + interestRate, loanTerm)) /
      (Math.pow(1 + interestRate, loanTerm) - 1);

    const propertyTax = homePrice * 0.012 / 12;
    const maintenance = homePrice * 0.01 / 12;

    const totalOwnership = mortgage + propertyTax + maintenance;

    if (totalOwnership < rent) {
      setResult(
        `Buying is cheaper. Monthly cost: $${Math.round(
          totalOwnership
        )} vs Rent: $${rent}`
      );
    } else {
      setResult(
        `Renting is cheaper. Monthly cost: $${Math.round(
          totalOwnership
        )} vs Rent: $${rent}`
      );
    }
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Rent vs Buy Calculator
      </h1>

      <p className="mb-6 text-gray-600">
        Compare real monthly costs including mortgage, taxes, and maintenance.
      </p>

      <input
        type="number"
        placeholder="Home Price"
        className="border p-2 w-full mb-3"
        onChange={(e) => setHomePrice(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Monthly Rent"
        className="border p-2 w-full mb-3"
        onChange={(e) => setRent(Number(e.target.value))}
      />

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p className="font-bold">{result}</p>
        </div>
      )}
    </main>
  );
}