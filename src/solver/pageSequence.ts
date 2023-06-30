import signatureSequence from "./signaturesSequence";

const cache = new Map<number[], number[]>();

const calculatePageSequence = (sizes: number[]): number[] =>
  sizes
    .map((size) => signatureSequence(size))
    .reduce<{ size: number; pages: number[] }>(
      ({ size, pages }, x) => ({
        size: size + x.length,
        pages: pages.concat(x.map((page) => page + size)),
      }),
      { size: 0, pages: [] }
    ).pages;

const pageSequence = (sizes: number[]): number[] => {
  const found = cache.get(sizes);
  if (!found) {
    const result = calculatePageSequence(sizes);
    cache.set(sizes, result);
    return result;
  }
  return found;
};
export default pageSequence;
