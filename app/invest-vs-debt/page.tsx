"use client";
import { useState } from "react";

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function InvestVsDebt() {
  const [extraMoney, setExtraMoney] = useState(500);
  const [debtRate, setDebtRate] = useState(18);
  const [investReturn, setInvestReturn] = useState(7);
  const [years, setYears] = useState(5);

  const months = years * 12;

  const debtSavings =
    extraMoney *
    ((Math.pow(1 + debtRate / 100 / 12, months) - 1) /
      (debtRate / 100 / 12));

  const investmentValue =
    extraMoney *
    ((Math.pow(1 + investReturn / 100 / 12, months) - 1) /
      (investReturn / 100 / 12));

  const recommendation =
    debtRate > investReturn
      ? "Pay off debt first"
      : "Investing may be better long-term";

  return (
    <main className="p-10 max-w-xl mx-auto">
      <a
        href="/"
        className="inline-block mb-6 px-3 py-2 bg-gray-200 rounded"
      >
        ← Back to Home
      </a>

      <h1 className="text-4xl font-bold mb-4">
        Invest vs Pay Off Debt
      </h1>

      <input
        type="number"
        value={extraMoney}
        onChange={(e) => setExtraMoney(Number(e.target.value))}
        className="border p-2 w-full mb-3"
        placeholder="Extra money per month"
      />

      <input
        type="number"
        value={debtRate}
        onChange={(e) => setDebtRate(Number(e.target.value))}
        className="border p-2 w-full mb-3"
        placeholder="Debt interest rate %"
      />

      <input
        type="number"
        value={investReturn}
        onChange={(e) => setInvestReturn(Number(e.target.value))}
        className="border p-2 w-full mb-3"
        placeholder="Investment return %"
      />

      <input
        type="number"
        value={years}
        onChange={(e) => setYears(Number(e.target.value))}
        className="border p-2 w-full mb-6"
        placeholder="Years"
      />

      <div className="p-4 bg-gray-100 rounded space-y-2">
        <p><strong>Debt savings:</strong> {formatMoney(debtSavings)}</p>
        <p><strong>Investment value:</strong> {formatMoney(investmentValue)}</p>
        <p><strong>Recommendation:</strong> {recommendation}</p>
      </div>
    </main>
  );
}