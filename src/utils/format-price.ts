export const formatPrice = (price: string) => {
  const formattedNumber = new Intl.NumberFormat('ru-RU').format(Number(price));
  return formattedNumber;
};
