export const countPages = (totalPage: number) => {
  const total = totalPage / 10;
  return Math.ceil(total);
};
