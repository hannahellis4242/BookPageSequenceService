import pageSequence from "../src/solver/pageSequence";
describe("pageSequence", () => {
  test.each([
    [[], []],
    [[1], [4, 1, 2, 3]],
    [[2], [8, 1, 2, 7, 6, 3, 4, 5]],
    [
      [1, 1],
      [4, 1, 2, 3, 8, 5, 6, 7],
    ],
    [
      [2, 1],
      [8, 1, 2, 7, 6, 3, 4, 5, 12, 9, 10, 11],
    ],
  ])(
    "when I have a list of signature sizes %j and I call pageSequence, it should return %j",
    (signatures, expected) =>
      expect(pageSequence(signatures)).toStrictEqual(expected)
  );
});
