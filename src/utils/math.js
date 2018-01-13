export const getPercentDiff = (start, end) => {
  return (((end - start) / start) * 100).toFixed(2);
}

export const BTCtoCAD = (BTC, currentPrice) => {
  return (BTC * currentPrice).toFixed(2);
}

export const getChangeInBTCForSell = (buy, sell) => {
  const { amount: amountSold, sellPrice, BTCPriceAtSell } = sell;
  const { buyPrice, BTCPriceAtBuy } = buy;

  const equivelentBTCBought = buyPrice * amountSold;

  const BTCSold = amountSold * sellPrice;

  return (BTCSold - equivelentBTCBought).toFixed(6);
}

export const getUnrealizedProfit = (buy) => {
  const { amount, buyPrice, currentPrice } = buy;
  const buyAmount = amount * buyPrice;

  const potentialSellAmount = amount * currentPrice;

  return (potentialSellAmount - buyAmount).toFixed(6);
}

export const getRealizedProfit = (buy) => {
  const { buyPrice, amount, sells = [] } = buy;

  if (sells.length === 0) return 0;

  const BTCPaid = buyPrice * amount;

  let totalSold = 0;
  sells.forEach((sell) => {
    const { sellPrice, amount: amountSold } = sell;
    const BTCGained = sellPrice * amountSold;
    totalSold += BTCGained;
  })

  return (totalSold - BTCPaid).toFixed(6);
}