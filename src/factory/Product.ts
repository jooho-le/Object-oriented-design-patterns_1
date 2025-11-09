export interface Button {
  kind: 'web' | 'windows';
  label: string;
  renderLabel(): string;
  onClick(): string;
}

