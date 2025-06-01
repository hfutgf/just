export const formatPrice = (price: string) => {
  const cleaned = price.replace(/\s/g, '');
  const formattedNumber = new Intl.NumberFormat('ru-RU').format(Number(cleaned));
  return formattedNumber;
};
