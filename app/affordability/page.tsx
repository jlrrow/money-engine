"use client";
import { useState } from "react";

export default function Affordability() {
  const [income, setIncome] = useState(80000);
  const [debt, setDebt] = useState(500);
  const [rate, setRate] = useState(6.5);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const monthlyIncome = income / 12;
    const maxPayment = monthlyIncome * 0.28 - debt;

    const monthlyRate = rate / 100 / 12;
    const loanTerm = 30 * 12;

    const loanAmount =
      (maxPayment *
        (Math.pow(1 + monthlyRate, loanTerm) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, loanTerm));

    setResult(Math.round(loanAmount));
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        How Much House Can I Afford?
      </h1>

      <input
        type="number"
        value={income}
        onChange={(e) => setIncome(Number(e.target.value))}
        className="border p-2 w-full mb-3"
        placeholder="Annual Income"
      />

      <input
        type="number"
        value={debt}
        onChange={(e) => setDebt(Number(e.target.value))}
        className="border p-2 w-full mb-3"
        placeholder="Monthly Debt"
      />

      <input
        type="number"
        value={rate}
        onChange={(e) => setRate(Number(e.target.value))}
        className="border p-2 w-full mb-3"
        placeholder="Interest Rate %"
      />

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Calculate
      </button>

      {result && (
        <p className="mt-6 font-bold">
          You can afford a home around ${result.toLocaleString()}
        </p>
      )}
    </main>
  );
}