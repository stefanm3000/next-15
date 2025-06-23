"use server";

export const getLatestCryptos = async () => {
  const url =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
  const response = await fetch(url, {
    headers: {
      "X-CMC_PRO_API_KEY": process.env.SECRET_COINMARKET_API_KEY || "",
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(`CoinMarketCap API error: ${response.status}`);
  }
  return response.json();
};
