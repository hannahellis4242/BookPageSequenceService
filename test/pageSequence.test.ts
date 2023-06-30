const pageSequence = (_: number[]): number[] => [];
describe("pageSequence", () => {
  test.each([[[], []]])(
    "when I have a list of signature sizes %j and I call pageSequence, it should return %j",
    (signatures, expected) =>
      expect(pageSequence(signatures)).toStrictEqual(expected)
  );
});
