export const formatCurrencyJPY = (amount: number): string => {
  const formatter = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  });

  return formatter.format(amount);
};
