export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-4">
        Rent vs Buy Calculator
      </h1>

      <p className="mb-6">
        Find out whether renting or buying is the better financial decision.
      </p>

      <div className="border p-4 rounded-lg">
        <input
          type="number"
          placeholder="Home Price"
          className="border p-2 mr-2 mb-2"
        />
        <input
          type="number"
          placeholder="Monthly Rent"
          className="border p-2 mr-2 mb-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Calculate
        </button>
      </div>
    </main>
  );
}