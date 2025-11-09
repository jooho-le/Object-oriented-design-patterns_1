import type { Button } from './Product';

export class HtmlButton implements Button {
  kind: 'web' = 'web';
  label: string;
  constructor(label = 'HTML Button') {
    this.label = label;
  }
  renderLabel(): string {
    return `🌐 ${this.label}`;
  }
  onClick(): string {
    return 'HTML Button clicked → Navigate via anchor/link';
  }
}

export class WindowsButton implements Button {
  kind: 'windows' = 'windows';
  label: string;
  constructor(label = 'Windows Button') {
    this.label = label;
  }
  renderLabel(): string {
    return `🪟 ${this.label}`;
  }
  onClick(): string {
    return 'Windows Button clicked → Trigger native-style action';
  }
}

