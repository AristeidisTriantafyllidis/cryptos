export default async function fetchData() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h,24h,7d",
    {
      headers: {
        "x-cg-demo-api-key": "CG-4BmZ36BqvWyusNZayyXcVQHL",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
}
