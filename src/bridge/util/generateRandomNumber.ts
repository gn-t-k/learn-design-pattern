export const generateRandomNumber = (limit: number): number => {
  const min = Math.ceil(0);
  const max = Math.floor(limit);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
