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
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="inline-block mb-6 px-4 py-2.5 bg-white border rounded-xl shadow-sm hover:bg-slate-50"
        >
          ← Back to Rent vs Buy
        </a>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Invest vs Pay Off Debt
        </h1>

        <p className="text-base md:text-lg text-slate-600 max-w-2xl mb-6">
          Compare whether your extra money is better used paying off debt or
          investing for future growth.
        </p>

        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-200">
          <input
            type="number"
            value={extraMoney}
            onChange={(e) => setExtraMoney(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Extra money per month"
          />

          <input
            type="number"
            value={debtRate}
            onChange={(e) => setDebtRate(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Debt interest rate %"
          />

          <input
            type="number"
            value={investReturn}
            onChange={(e) => setInvestReturn(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Investment return %"
          />

          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 mb-3"
            placeholder="Years"
          />

          <div className="mt-6 rounded-2xl bg-slate-100 p-5 ring-1 ring-slate-200 space-y-2">
            <p className="text-base md:text-lg text-slate-700">
              <strong>Debt savings:</strong> {formatMoney(debtSavings)}
            </p>
            <p className="text-base md:text-lg text-slate-700">
              <strong>Investment value:</strong> {formatMoney(investmentValue)}
            </p>
            <p className="text-base md:text-lg text-slate-700">
              <strong>Recommendation:</strong> {recommendation}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}