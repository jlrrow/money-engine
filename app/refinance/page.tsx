"use client";
import { useState } from "react";

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function monthlyPayment(
  principal: number,
  annualRate: number,
  years: number
) {
  const monthlyRate = annualRate / 100 / 12;
  const payments = years * 12;

  if (monthlyRate === 0) return principal / payments;

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) /
    (Math.pow(1 + monthlyRate, payments) - 1)
  );
}

export default function RefinanceCalculator() {
  const [loanBalance, setLoanBalance] = useState(250000);
  const [currentRate, setCurrentRate] = useState(7.5);
  const [newRate, setNewRate] = useState(6.25);
  const [yearsLeft, setYearsLeft] = useState(25);
  const [closingCosts, setClosingCosts] = useState(5000);

  const currentPayment = monthlyPayment(loanBalance, currentRate, yearsLeft);
  const newPayment = monthlyPayment(loanBalance, newRate, yearsLeft);
  const monthlySavings = currentPayment - newPayment;
  const breakEvenMonths =
    monthlySavings > 0 ? closingCosts / monthlySavings : null;

  return (
    <main className="p-10 max-w-xl mx-auto">
      <a
        href="/"
        className="inline-block mb-6 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back to Rent vs Buy
      </a>

      <h1 className="text-4xl font-bold mb-4">Refinance Calculator</h1>

      <p className="mb-6 text-gray-600">
        Compare your current mortgage to a refinanced loan and estimate your break-even point.
      </p>

      <input
        type="number"
        value={loanBalance}
        onChange={(e) => setLoanBalance(Number(e.target.value))}
        className="border p-2 w-full mb-3"
        placeholder="Loan Balance"
      />

      <input
        type="number"
        step="0.01"
        value={currentRate}
        onChange={(e) => setCurrentRate(Number(e.target.value))}
        className="border p-2 w-full mb-3"
        placeholder="Current Interest Rate %"
      />

      <input
        type="number"
        step="0.01"
        value={newRate}
        onChange={(e) => setNewRate(Number(e.target.value))}
        className="border p-2 w-full mb-3"
        placeholder="New Interest Rate %"
      />

      <input
        type="number"
        value={yearsLeft}
        onChange={(e) => setYearsLeft(Number(e.target.value))}
        className="border p-2 w-full mb-3"
        placeholder="Years Left on Loan"
      />

      <input
        type="number"
        value={closingCosts}
        onChange={(e) => setClosingCosts(Number(e.target.value))}
        className="border p-2 w-full mb-6"
        placeholder="Closing Costs"
      />

      <div className="p-4 bg-gray-100 rounded space-y-2">
        <p><strong>Current Payment:</strong> {formatMoney(currentPayment)}</p>
        <p><strong>New Payment:</strong> {formatMoney(newPayment)}</p>
        <p><strong>Monthly Savings:</strong> {formatMoney(monthlySavings)}</p>
        <p>
          <strong>Break-even:</strong>{" "}
          {breakEvenMonths
            ? `${breakEvenMonths.toFixed(1)} months`
            : "No savings from refinancing"}
        </p>
      </div>
    </main>
  );
}