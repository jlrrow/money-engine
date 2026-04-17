"use client";
import { useMemo, useState } from "react";

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  const [homePrice, setHomePrice] = useState(300000);
  const [monthlyRent, setMonthlyRent] = useState(2200);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [maintenanceRate, setMaintenanceRate] = useState(1);
  const [insuranceMonthly, setInsuranceMonthly] = useState(150);
  const [hoaMonthly, setHoaMonthly] = useState(0);

  const results = useMemo(() => {
    const downPayment = homePrice * (downPaymentPercent / 100);
    const loanAmount = homePrice - downPayment;

    const monthlyInterestRate = interestRate / 100 / 12;
    const loanTermMonths = 30 * 12;

    const mortgagePayment =
      loanAmount > 0
        ? (loanAmount *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
          (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)
        : 0;

    const propertyTaxMonthly = (homePrice * (propertyTaxRate / 100)) / 12;
    const maintenanceMonthly = (homePrice * (maintenanceRate / 100)) / 12;

    const totalBuyMonthly =
      mortgagePayment +
      propertyTaxMonthly +
      maintenanceMonthly +
      insuranceMonthly +
      hoaMonthly;

    const difference = Math.abs(totalBuyMonthly - monthlyRent);
    const recommendation =
      totalBuyMonthly < monthlyRent ? "Buying is cheaper" : "Renting is cheaper";

    return {
      downPayment,
      loanAmount,
      mortgagePayment,
      propertyTaxMonthly,
      maintenanceMonthly,
      totalBuyMonthly,
      difference,
      recommendation,
    };
  }, [
    homePrice,
    monthlyRent,
    downPaymentPercent,
    interestRate,
    propertyTaxRate,
    maintenanceRate,
    insuranceMonthly,
    hoaMonthly,
  ]);

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">Rent vs Buy Calculator</h1>
        <p className="text-slate-600 mb-8">
          Compare monthly renting costs against realistic homeownership costs.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Inputs</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Home Price</label>
                <input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Monthly Rent</label>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Down Payment %
                </label>
                <input
                  type="number"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Interest Rate %</label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Property Tax % / year
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={propertyTaxRate}
                  onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Maintenance % / year
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={maintenanceRate}
                  onChange={(e) => setMaintenanceRate(Number(e.target.value))}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Home Insurance / month
                </label>
                <input
                  type="number"
                  value={insuranceMonthly}
                  onChange={(e) => setInsuranceMonthly(Number(e.target.value))}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">HOA / month</label>
                <input
                  type="number"
                  value={hoaMonthly}
                  onChange={(e) => setHoaMonthly(Number(e.target.value))}
                  className="w-full rounded-lg border p-3"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Results</h2>

            <div className="rounded-xl bg-slate-900 text-white p-5 mb-6">
              <p className="text-sm uppercase tracking-wide text-slate-300 mb-2">
                Recommendation
              </p>
              <p className="text-2xl font-bold">{results.recommendation}</p>
              <p className="mt-2 text-slate-300">
                Difference: {formatMoney(results.difference)} per month
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Monthly Rent</span>
                <span className="font-semibold">{formatMoney(monthlyRent)}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Down Payment</span>
                <span className="font-semibold">{formatMoney(results.downPayment)}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Loan Amount</span>
                <span className="font-semibold">{formatMoney(results.loanAmount)}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Mortgage</span>
                <span className="font-semibold">
                  {formatMoney(results.mortgagePayment)}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Property Tax</span>
                <span className="font-semibold">
                  {formatMoney(results.propertyTaxMonthly)}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Maintenance</span>
                <span className="font-semibold">
                  {formatMoney(results.maintenanceMonthly)}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Insurance</span>
                <span className="font-semibold">{formatMoney(insuranceMonthly)}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>HOA</span>
                <span className="font-semibold">{formatMoney(hoaMonthly)}</span>
              </div>

              <div className="flex justify-between pt-2 text-base">
                <span className="font-bold">Total Buy Cost / month</span>
                <span className="font-bold">
                  {formatMoney(results.totalBuyMonthly)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}