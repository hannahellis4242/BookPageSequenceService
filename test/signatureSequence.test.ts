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
const signatureSequence = (sheets: number) => [
  ...signatureSequenceGenerator(sheets),
];

describe("signatureSequence", () => {
  test.each([
    [1, [4, 1, 2, 3]],
    [2, [8, 1, 2, 7, 6, 3, 4, 5]],
    [3, [12, 1, 2, 11, 10, 3, 4, 9, 8, 5, 6, 7]],
    [4, [16, 1, 2, 15, 14, 3, 4, 13, 12, 5, 6, 11, 10, 7, 8, 9]],
    [
      5,
      [20, 1, 2, 19, 18, 3, 4, 17, 16, 5, 6, 15, 14, 7, 8, 13, 12, 9, 10, 11],
    ],
  ])(
    "when I have a signature of size %i and I call signatureSequence, it should return %i",
    (size, expected) => expect(signatureSequence(size)).toStrictEqual(expected)
  );
});
