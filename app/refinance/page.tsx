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
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="inline-block mb-6 px-4 py-2.5 bg-white border rounded-xl shadow-sm hover:bg-slate-50"
        >
          ← Back to Rent vs Buy
        </a>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Refinance Calculator
        </h1>

        <p className="text-base md:text-lg text-slate-600 max-w-2xl mb-6">
          Compare your current mortgage to a refinanced loan and estimate your
          monthly savings and break-even point.
        </p>

        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-200">
          <input
            type="number"
            value={loanBalance}
            onChange={(e) => setLoanBalance(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Loan Balance"
          />

          <input
            type="number"
            step="0.01"
            value={currentRate}
            onChange={(e) => setCurrentRate(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Current Interest Rate %"
          />

          <input
            type="number"
            step="0.01"
            value={newRate}
            onChange={(e) => setNewRate(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="New Interest Rate %"
          />

          <input
            type="number"
            value={yearsLeft}
            onChange={(e) => setYearsLeft(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Years Left on Loan"
          />

          <input
            type="number"
            value={closingCosts}
            onChange={(e) => setClosingCosts(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Closing Costs"
          />

          <div className="mt-6 rounded-2xl bg-slate-100 p-5 ring-1 ring-slate-200 space-y-2">
            <p className="text-base md:text-lg text-slate-700">
              <strong>Current Payment:</strong> {formatMoney(currentPayment)}
            </p>
            <p className="text-base md:text-lg text-slate-700">
              <strong>New Payment:</strong> {formatMoney(newPayment)}
            </p>
            <p className="text-base md:text-lg text-slate-700">
              <strong>Monthly Savings:</strong> {formatMoney(monthlySavings)}
            </p>
            <p className="text-base md:text-lg text-slate-700">
              <strong>Break-even:</strong>{" "}
              {breakEvenMonths
                ? `${breakEvenMonths.toFixed(1)} months`
                : "No savings from refinancing"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}