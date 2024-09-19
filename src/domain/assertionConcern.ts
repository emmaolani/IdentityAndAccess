class AssertionConcern {
  protected assertNotNull(aValue: string, aMessage: string) {
    const modifiedValue = aValue.trim();
    if (modifiedValue.length === 0) {
      throw Error(aMessage);
    }
    return;
  }

  protected assertLengthIsCorrect(
    aValue: string,
    min: number,
    max: number,
    aMessage: string
  ) {
    const length = aValue.length;
    if (length < min || length > max) {
      throw Error(aMessage);
    }
  }

  protected assertNoWhiteSpace(aValue: string, aMessage: string) {
    if (aValue.match(/\s+/)) {
      throw Error(aMessage);
    }

    return;
  }

  protected assertMatchesRegExp(
    aValue: string,
    regex: RegExp,
    aMessage: string
  ) {
    if (aValue.match(regex)) {
      return;
    }
    throw Error(aMessage);
  }
}

export default AssertionConcern;
