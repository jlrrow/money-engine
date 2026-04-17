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
    <main className="p-10 max-w-xl mx-auto">
      <a
        href="/"
        className="inline-block mb-6 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back to Rent vs Buy
      </a>

      <h1 className="text-4xl font-bold mb-4">Mortgage Calculator</h1>

      <p className="mb-6 text-gray-600">
        Estimate your monthly mortgage payment based on home price, down payment,
        rate, and loan term.
      </p>

      <input
        type="number"
        value={homePrice}
        onChange={(e) => setHomePrice(Number(e.target.value))}
        className="border p-2 w-full mb-3"
        placeholder="Home Price"
      />

      <input
        type="number"
        value={downPayment}
        onChange={(e) => setDownPayment(Number(e.target.value))}
        className="border p-2 w-full mb-3"
        placeholder="Down Payment"
      />

      <input
        type="number"
        step="0.1"
        value={interestRate}
        onChange={(e) => setInterestRate(Number(e.target.value))}
        className="border p-2 w-full mb-3"
        placeholder="Interest Rate %"
      />

      <input
        type="number"
        value={years}
        onChange={(e) => setYears(Number(e.target.value))}
        className="border p-2 w-full mb-3"
        placeholder="Loan Term"
      />

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Calculate
      </button>

      {payment && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p className="font-bold">
            Estimated monthly mortgage: {formatMoney(payment)}
          </p>

          <a
            href={`/?homePrice=${homePrice}&rate=${interestRate}`}
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Compare with rent vs buy →
          </a>
        </div>
      )}
    </main>
  );
}