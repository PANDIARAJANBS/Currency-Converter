const convert = (amount: number, rate: number) => amount * rate;

describe("conversion", () => {
  it("multiplies amount by rate", () => {
    expect(convert(100, 1.16)).toBeCloseTo(116);
  });
});
