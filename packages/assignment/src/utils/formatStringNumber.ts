const formatStringNumber = (ether: string): string => {
  const [integer, decimal] = ether.split('.', 2);
  return `${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${decimal.slice(
    0,
    6
  )}`;
};

export default formatStringNumber;
