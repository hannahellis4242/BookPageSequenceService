import signatureSequence from "./signaturesSequence";

const cache = new Map<number[], number[][]>();

const calculatePageSequence = (sizes: number[]): number[][] =>
  sizes
    .map((size) => signatureSequence(size))
    .reduce<{ size: number; pages: number[][] }>(
      ({ size, pages }, x) => {
        const updated = x.map((page) => page + size);
        pages.push(updated);
        return {
          size: size + updated.length,
          pages,
        };
      },
      { size: 0, pages: [] }
    ).pages;

const separatedPageSequence = (sizes: number[]): number[][] => {
  const found = cache.get(sizes);
  if (!found) {
    const result = calculatePageSequence(sizes);
    cache.set(sizes, result);
    return result;
  }
  return found;
};
export default separatedPageSequence;
