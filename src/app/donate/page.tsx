"use client";

import { useState } from "react";

const MONTHLY_PRICES: Record<number, string> = {
  5: "price_monthly_5",
  10: "price_monthly_10",
  25: "price_monthly_25",
  50: "price_monthly_50",
};

export default function DonatePage() {
  const [recurring, setRecurring] = useState(false);
  const [amount, setAmount] = useState(10);

  const startCheckout = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recurring,
        amount,
        priceId: recurring ? MONTHLY_PRICES[amount] : null,
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">
        Unterstütze Second Life
      </h1>

      {/* Toggle */}
      <div className="flex gap-4 mb-8">
        <button
          className={!recurring ? "font-bold" : ""}
          onClick={() => setRecurring(false)}
        >
          Einmalig
        </button>
        <button
          className={recurring ? "font-bold" : ""}
          onClick={() => setRecurring(true)}
        >
          Monatlich
        </button>
      </div>

      {/* Amounts */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[5, 10, 25, 50].map((value) => (
          <button
            key={value}
            onClick={() => setAmount(value)}
            className={`border p-4 ${
              amount === value ? "border-black" : "border-gray-300"
            }`}
          >
            €{value}
          </button>
        ))}
      </div>

      {/* Custom */}
      {!recurring && (
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full border p-3 mb-6"
          placeholder="Eigener Betrag (€)"
        />
      )}

      <button
        onClick={startCheckout}
        className="w-full bg-black text-white py-4 text-lg"
      >
        Jetzt unterstützen
      </button>
    </main>
  );
}
