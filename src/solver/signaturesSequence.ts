function* signatureSequenceGenerator(sheets: number) {
  const pages = 4 * sheets;
  {
    let index = 0;
    let next = pages;
    while (index < pages) {
      yield next;
      const step = index % 4;
      if (step % 2 == 0) {
        next = pages + 1 - next;
      } else if (step % 4 == 1) {
        ++next;
      } else if (step % 4 == 3) {
        --next;
      }
      ++index;
    }
  }
}

//lazy caching for performance reasons
const cache = new Map<number, number[]>();

const signatureSequence = (sheets: number) => {
  if (cache.has(sheets)) {
    return cache.get(sheets);
  }
  const result = [...signatureSequenceGenerator(sheets)];
  cache.set(sheets, result);
  return result;
};

export default signatureSequence;
