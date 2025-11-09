// Component 인터페이스
export interface TextComponent {
  render(): string;
}

// Concrete Component
export class PlainText implements TextComponent {
  constructor(private content: string) {}
  render(): string {
    return this.content;
  }
}

// Base Decorator
export abstract class TextDecorator implements TextComponent {
  constructor(protected wrappee: TextComponent) {}
  render(): string {
    return this.wrappee.render();
  }
}

export class BoldDecorator extends TextDecorator {
  render(): string {
    return `**${super.render()}**`;
  }
}

export class ItalicDecorator extends TextDecorator {
  render(): string {
    return `*${super.render()}*`;
  }
}

export class EmojiDecorator extends TextDecorator {
  constructor(wrappee: TextComponent, private emoji = '✨') { super(wrappee); }
  render(): string {
    return `${this.emoji} ${super.render()} ${this.emoji}`;
  }
}

