export const validateBody = (expectedType: object, body: object) => {
  for (const [key, value] of Object.entries(expectedType)) {
    expect(typeof body[key]).toEqual(value);
  }
};

export const compareResultAndExpect = (body: object, expectedResult: object) => {
  for (const [key, value] of Object.entries(expectedResult)) {
    expect(body[key]).toEqual(value);
  }
};