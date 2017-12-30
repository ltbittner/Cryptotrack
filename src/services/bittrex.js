
export const getCurrentPrice = async (symbol) => {
  const market = `BTC-${symbol}`;
  const url = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=BTC&e=BitTrex`;

  const result = await fetch(url);
  const body = await result.text();
  const json = JSON.parse(body);
  return json['BTC'];
}

export const getCurrentBTCPrice = async () => {
  const url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=CAD';

  const result = await fetch(url);
  const body = await result.text();
  const json = JSON.parse(body);
  return json['CAD'];
}