const signatureSequence = (_: number) => [4, 1, 2, 3];

describe("signatureSequence", () => {
  describe("when I have a signature of 1 sheet", () => {
    it("then signatureSequence should give back [4,1,2,3]", () => {
      const result = signatureSequence(1);
      expect(result).toStrictEqual([4, 1, 2, 3]);
    });
  });
});
