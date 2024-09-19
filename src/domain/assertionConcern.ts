class AssertionConcern {
  protected assertContainsPatterns(
    aValue: string,
    patterns: string[],
    aMessage: string
  ) {
    const regex = this.createRegexToCheckPattern(patterns);

    if (aValue.match(regex)) {
      return;
    }

    throw Error(aMessage);
  }

  private createRegexToCheckPattern(patterns: string[]) {
    const lookaheads = this.lookAheads(patterns);
    const allowedChar = this.allowedChar(patterns);
    return RegExp(`^${lookaheads}${allowedChar}$`);
  }

  private lookAheads(patterns: string[]) {
    return patterns
      .map((aPattern) => {
        return `(?=.*${this.replaceKeywords(aPattern)})`;
      })
      .join("");
  }

  private allowedChar(patterns: string[]) {
    return `[${patterns
      .map((aPattern) => {
        let modifiedValue = this.addSquareBracket(aPattern);

        modifiedValue = this.replaceKeywords(modifiedValue);

        modifiedValue = this.removeSquareBracket(modifiedValue);

        return modifiedValue;
      })
      .join("")}]+`;
  }

  private replaceKeywords(aPattern: string) {
    let modifiedPattern = aPattern;

    modifiedPattern = this.replaceCaseInsensitiveLetterKeyword(modifiedPattern);
    modifiedPattern = this.replaceLowerCaseLetterKeyword(modifiedPattern);
    modifiedPattern = this.replaceUpperCaseLetterKeyword(modifiedPattern);
    modifiedPattern = this.replaceNumberKeyword(modifiedPattern);

    return modifiedPattern;
  }

  private addSquareBracket(aPattern: string) {
    let modifiedPattern = aPattern;

    if (!modifiedPattern.match(/^\[.*\]$/)) {
      return `[ ${modifiedPattern} ]`;
    }

    return modifiedPattern;
  }

  private removeSquareBracket(aPattern: string) {
    let modifiedPattern = aPattern;

    if (modifiedPattern.startsWith("[") && modifiedPattern.endsWith("]")) {
      modifiedPattern = modifiedPattern.slice(1, -1);
    }
    return modifiedPattern;
  }

  private replaceCaseInsensitiveLetterKeyword(aPattern: string) {
    let modifiedPattern = aPattern;

    if (modifiedPattern.match(/^\[.*\]$/)) {
      modifiedPattern = modifiedPattern.replace(/\{letter\}/g, "a-zA-Z");
    } else if (!modifiedPattern.match(/^\[.*\]$ /)) {
      modifiedPattern = modifiedPattern.replace(/\{letter\}/g, "[a-zA-Z]+");
    }

    return modifiedPattern;
  }

  private replaceLowerCaseLetterKeyword(aPattern: string) {
    let modifiedPattern = aPattern;

    if (modifiedPattern.match(/^\[.*\]$/)) {
      modifiedPattern = modifiedPattern.replace(/\{lLetter\}/g, "a-z");
    } else if (!modifiedPattern.match(/^\[.*\]$ /)) {
      modifiedPattern = modifiedPattern.replace(/\{lLetter\}/g, "[a-z]+");
    }

    return modifiedPattern;
  }

  private replaceUpperCaseLetterKeyword(aPattern: string) {
    let modifiedPattern = aPattern;

    if (modifiedPattern.match(/^\[.*\]$/)) {
      modifiedPattern = modifiedPattern.replace(/\{uLetter\}/g, "A-Z");
    } else if (!modifiedPattern.match(/^\[.*\]$ /)) {
      modifiedPattern = modifiedPattern.replace(/\{uLetter\}/g, "[A-Z]+");
    }

    return modifiedPattern;
  }

  private replaceNumberKeyword(aPattern: string) {
    let modifiedPattern = aPattern;

    modifiedPattern = modifiedPattern.replace(/\{number\}/g, "\\d");

    return modifiedPattern;
  }
}

export default AssertionConcern;
