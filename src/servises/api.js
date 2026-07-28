export async function fetchData() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h,24h,7d",
    {
      headers: {
        "x-cg-demo-api-key": "CG-4BmZ36BqvWyusNZayyXcVQHL",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Response status : ${response.status}`);
  }
  return response.json();
}

export async function fetchTrendingCryptos() {
  const url = "https://api.coingecko.com/api/v3/search/trending";
  const response = await fetch(url, {
    method: "GET",
    headers: { "x-cg-demo-api-key": "CG-4BmZ36BqvWyusNZayyXcVQHL" },
  });
  if (!response.ok) {
    throw new Error(`Response Status : ${response.status} `);
  }
  return response.json();
}

export async function fetchSpecificCrypto(id) {
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "x-cg-demo-api-key": "CG-4BmZ36BqvWyusNZayyXcVQHL" },
  });
  if (!response.ok) {
    throw new Error(`Response Status : ${response.status}`);
  }
  return response.json();
}

export async function fetchDataForCHart(id, days) {
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "x-cg-demo-api-key": "CG-4BmZ36BqvWyusNZayyXcVQHL" },
  });
  if (!response.ok) {
    throw new Error(`Resonse stastus ${response.status}`);
  }
  return response.json();
}

export async function fetchEveryCoin() {
  const url = "https://api.coingecko.com/api/v3/coins/list";
  const response = await fetch(url, {
    method: "GET",
    headers: { "x-cg-demo-api-key": "CG-4BmZ36BqvWyusNZayyXcVQHL" },
  });
  if (!response.ok) {
    throw new Error(`Response status ${response.status}`);
  }
  return response.json();
}
