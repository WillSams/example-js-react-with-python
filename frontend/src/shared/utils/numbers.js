export const formatNumberAsMoney = (amount) => {
  if (amount === undefined) return undefined;

  const formattedAmount = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return `$${formattedAmount}`;
};
