export interface TextFormatter {
  format(text: string): string;
}

export class UpperCaseFormatter implements TextFormatter {
  format(text: string): string {
    return text.toUpperCase();
  }
}

export class LowerCaseFormatter implements TextFormatter {
  format(text: string): string {
    return text.toLowerCase();
  }
}

export class TitleCaseFormatter implements TextFormatter {
  format(text: string): string {
    return text
      .toLowerCase()
      .split(/\s+/)
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
      .join(' ');
  }
}

// Context: 선택된 전략을 사용
export class TextContext {
  constructor(private strategy: TextFormatter) {}
  setStrategy(strategy: TextFormatter) {
    this.strategy = strategy;
  }
  transform(text: string): string {
    return this.strategy.format(text);
  }
}

