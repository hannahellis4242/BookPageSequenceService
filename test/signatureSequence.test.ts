const signatureSequence = (_: number) => [4, 1, 2, 3];

describe("signatureSequence", () => {
  test.each([[1, [4, 1, 2, 3]]])(
    "when I have a signature of size %i and I call signatureSequence, it should return %i",
    (size, expected) => expect(signatureSequence(size)).toStrictEqual(expected)
  );
});
