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
      (maxPayment * (Math.pow(1 + monthlyRate, loanTerm) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, loanTerm));

    setResult(Math.round(loanAmount));
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="inline-block mb-6 px-4 py-2.5 bg-white border rounded-xl shadow-sm hover:bg-slate-50"
        >
          ← Back to Rent vs Buy
        </a>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          How Much House Can I Afford?
        </h1>

        <p className="text-base md:text-lg text-slate-600 max-w-2xl mb-6">
          Estimate the maximum home price you can afford based on your income,
          debt, and interest rate.
        </p>

        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-200">
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Annual Income"
          />

          <input
            type="number"
            value={debt}
            onChange={(e) => setDebt(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Monthly Debt"
          />

          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Interest Rate %"
          />

          <button
            onClick={calculate}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white hover:bg-slate-800"
          >
            Calculate
          </button>

          {result && (
            <div className="mt-6 rounded-2xl bg-slate-100 p-5 ring-1 ring-slate-200">
              <p className="text-base md:text-lg text-slate-700 mb-4">
                You can afford a home around ${result.toLocaleString()}
              </p>

              <a
                href={`/?homePrice=${result}`}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
              >
                Now compare renting vs buying →
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}