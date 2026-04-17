"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateMortgagePayment(
  principal: number,
  annualRatePercent: number,
  years: number
) {
  const monthlyRate = annualRatePercent / 100 / 12;
  const numberOfPayments = years * 12;

  if (principal <= 0) return 0;
  if (monthlyRate === 0) return principal / numberOfPayments;

  return (
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );
}

export default function Home() {
  const searchParams = useSearchParams();
  const homePriceFromURL = searchParams.get("homePrice");
  const rateFromURL = searchParams.get("rate");

  const [homePrice, setHomePrice] = useState(
    homePriceFromURL ? Number(homePriceFromURL) : 300000
   ); 
  const [monthlyRent, setMonthlyRent] = useState(2200);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(
  rateFromURL ? Number(rateFromURL) : 6.5
);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [maintenanceRate, setMaintenanceRate] = useState(1);
  const [insuranceMonthly, setInsuranceMonthly] = useState(150);
  const [hoaMonthly, setHoaMonthly] = useState(0);
  const [homeAppreciationRate, setHomeAppreciationRate] = useState(3);
  const [rentIncreaseRate, setRentIncreaseRate] = useState(3);
  const [investmentReturnRate, setInvestmentReturnRate] = useState(7);
  const [yearsToCompare, setYearsToCompare] = useState(10);

  const results = useMemo(() => {
    const downPayment = homePrice * (downPaymentPercent / 100);
    const loanAmount = homePrice - downPayment;

    const mortgagePayment = calculateMortgagePayment(
      loanAmount,
      interestRate,
      30
    );

    const propertyTaxMonthly = (homePrice * (propertyTaxRate / 100)) / 12;
    const maintenanceMonthly = (homePrice * (maintenanceRate / 100)) / 12;

    const totalBuyMonthly =
      mortgagePayment +
      propertyTaxMonthly +
      maintenanceMonthly +
      insuranceMonthly +
      hoaMonthly;

    const monthlyDifference = Math.abs(totalBuyMonthly - monthlyRent);
    const recommendation =
      totalBuyMonthly < monthlyRent
        ? "Buying is cheaper today"
        : "Renting is cheaper today";

    let breakEvenYear: number | null = null;
    let finalBuyerNetWorth = 0;
    let finalRenterNetWorth = 0;

    const monthlyInvestmentReturn = investmentReturnRate / 100 / 12;
    const monthlyHomeAppreciation = homeAppreciationRate / 100 / 12;
    const monthlyRentIncrease = rentIncreaseRate / 100 / 12;
    const totalMonths = yearsToCompare * 12;

    let remainingLoan = loanAmount;
    let homeValue = homePrice;
    let renterInvestments = downPayment;

    const chartData: {
      year: number;
      buyerNetWorth: number;
      renterNetWorth: number;
    }[] = [];

    for (let month = 1; month <= totalMonths; month++) {
      const interestPortion = remainingLoan * (interestRate / 100 / 12);
      const principalPortion = mortgagePayment - interestPortion;
      remainingLoan = Math.max(0, remainingLoan - principalPortion);

      homeValue = homeValue * (1 + monthlyHomeAppreciation);

      const currentRent =
        monthlyRent * Math.pow(1 + monthlyRentIncrease, month / 12);

      const monthlyOwnerCost =
        mortgagePayment +
        propertyTaxMonthly +
        maintenanceMonthly +
        insuranceMonthly +
        hoaMonthly;

      const renterMonthlySurplus = Math.max(0, monthlyOwnerCost - currentRent);

      renterInvestments =
        renterInvestments * (1 + monthlyInvestmentReturn) + renterMonthlySurplus;

      const buyingClosingCosts = homePrice * 0.03;
      const sellingCosts = homeValue * 0.06;
      const buyerNetAfterSale = homeValue - sellingCosts - remainingLoan;

      if (!breakEvenYear && buyerNetAfterSale > renterInvestments + buyingClosingCosts) {
        breakEvenYear = month / 12;
      }

      finalBuyerNetWorth = buyerNetAfterSale - buyingClosingCosts;
      finalRenterNetWorth = renterInvestments;

      if (month % 12 === 0) {
        chartData.push({
          year: month / 12,
          buyerNetWorth: Math.round(finalBuyerNetWorth),
          renterNetWorth: Math.round(finalRenterNetWorth),
        });
      }
    }

    return {
      downPayment,
      loanAmount,
      mortgagePayment,
      propertyTaxMonthly,
      maintenanceMonthly,
      totalBuyMonthly,
      monthlyDifference,
      recommendation,
      breakEvenYear,
      finalBuyerNetWorth,
      finalRenterNetWorth,
      chartData,
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
    homeAppreciationRate,
    rentIncreaseRate,
    investmentReturnRate,
    yearsToCompare,
  ]);

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">
  Rent vs Buy Calculator (2026)
</h1>

<p className="mb-6 text-gray-600">
  Use this calculator to compare renting vs buying with real numbers,
  including mortgage, taxes, and break-even analysis.
</p>

<div className="mb-6 flex gap-3">
<a
  href="/affordability"
  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
>
  Start with affordability →
</a>

<a
  href="/mortgage"
  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
>
  Mortgage calculator →
</a>  

<a
    href="/refinance"
    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
  >
    Refinance calculator →
  </a>

  <a
  href="/invest-vs-debt"
  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
>
  Invest vs debt →
</a>
</div>
        <p className="text-slate-600 mb-8">
          Compare renting vs buying, including monthly costs and break-even timing.
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
                <label className="block text-sm font-medium mb-1">Down Payment %</label>
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
                <label className="block text-sm font-medium mb-1">Property Tax % / year</label>
                <input
                  type="number"
                  step="0.1"
                  value={propertyTaxRate}
                  onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Maintenance % / year</label>
                <input
                  type="number"
                  step="0.1"
                  value={maintenanceRate}
                  onChange={(e) => setMaintenanceRate(Number(e.target.value))}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Home Insurance / month</label>
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

              <div>
                <label className="block text-sm font-medium mb-1">Home Appreciation % / year</label>
                <input
                  type="number"
                  step="0.1"
                  value={homeAppreciationRate}
                  onChange={(e) => setHomeAppreciationRate(Number(e.target.value))}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Rent Increase % / year</label>
                <input
                  type="number"
                  step="0.1"
                  value={rentIncreaseRate}
                  onChange={(e) => setRentIncreaseRate(Number(e.target.value))}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Investment Return % / year</label>
                <input
                  type="number"
                  step="0.1"
                  value={investmentReturnRate}
                  onChange={(e) => setInvestmentReturnRate(Number(e.target.value))}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Years to Compare</label>
                <input
                  type="number"
                  value={yearsToCompare}
                  onChange={(e) => setYearsToCompare(Number(e.target.value))}
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
                Monthly difference: {formatMoney(results.monthlyDifference)}
              </p>
              <p className="mt-2 text-slate-300">
                Break-even:{" "}
                {results.breakEvenYear
                  ? `${results.breakEvenYear.toFixed(1)} years`
                  : `Not within ${yearsToCompare} years`}
              </p>
            </div>

            <div className="space-y-3 text-sm mb-8">
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
                <span className="font-semibold">{formatMoney(results.mortgagePayment)}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Property Tax</span>
                <span className="font-semibold">{formatMoney(results.propertyTaxMonthly)}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Maintenance</span>
                <span className="font-semibold">{formatMoney(results.maintenanceMonthly)}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Insurance</span>
                <span className="font-semibold">{formatMoney(insuranceMonthly)}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>HOA</span>
                <span className="font-semibold">{formatMoney(hoaMonthly)}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Total Buy Cost / month</span>
                <span className="font-semibold">{formatMoney(results.totalBuyMonthly)}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Buyer Net Worth After {yearsToCompare} Years</span>
                <span className="font-semibold">{formatMoney(results.finalBuyerNetWorth)}</span>
              </div>

              <div className="flex justify-between pt-2 text-base">
                <span className="font-bold">Renter Net Worth After {yearsToCompare} Years</span>
                <span className="font-bold">{formatMoney(results.finalRenterNetWorth)}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Net Worth Over Time</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.chartData}>
                    <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
                    <Tooltip formatter={(value: any) => formatMoney(Number(value))} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="buyerNetWorth"
                      name="Buyer Net Worth"
                      stroke="#22c55e"
                      strokeWidth={4}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="renterNetWorth"
                      name="Renter Net Worth"
                      stroke="#ef4444"
                      strokeWidth={4}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}