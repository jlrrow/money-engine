"use client";
import { useState } from "react";

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const [payment, setPayment] = useState<number | null>(null);

  const calculate = () => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;

    const monthlyPayment =
      (loanAmount *
        monthlyRate *
        Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setPayment(monthlyPayment);
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
          Mortgage Calculator
        </h1>

        <p className="text-base md:text-lg text-slate-600 max-w-2xl mb-6">
          Estimate your monthly mortgage payment based on home price, down
          payment, interest rate, and loan term.
        </p>

        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-200">
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Home Price"
          />

          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Down Payment"
          />

          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Interest Rate %"
          />

          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Loan Term"
          />

          <button
            onClick={calculate}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white hover:bg-slate-800"
          >
            Calculate
          </button>

          {payment && (
            <div className="mt-6 rounded-2xl bg-slate-100 p-5 ring-1 ring-slate-200">
              <p className="text-base md:text-lg text-slate-700 mb-4">
                Estimated monthly mortgage: {formatMoney(payment)}
              </p>

              <a
                href={`/?homePrice=${homePrice}&rate=${interestRate}`}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
              >
                Compare with rent vs buy →
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}