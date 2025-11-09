export interface ReportBuilder {
  reset(): void;
  setTitle(title: string): void;
  addSection(text: string): void;
  getResult(): string;
}

export class MarkdownReportBuilder implements ReportBuilder {
  private parts: string[] = [];
  reset(): void {
    this.parts = [];
  }
  setTitle(title: string): void {
    this.parts.push(`# ${title}`);
  }
  addSection(text: string): void {
    this.parts.push(`- ${text}`);
  }
  getResult(): string {
    return this.parts.join('\n');
  }
}

export class HtmlReportBuilder implements ReportBuilder {
  private title = '';
  private items: string[] = [];
  reset(): void {
    this.title = '';
    this.items = [];
  }
  setTitle(title: string): void {
    this.title = title;
  }
  addSection(text: string): void {
    this.items.push(`<li>${text}</li>`);
  }
  getResult(): string {
    return `<article><h3>${this.title}</h3><ul>${this.items.join('')}</ul></article>`;
  }
}

// Director: 빌드 순서를 캡슐화
export class ReportDirector {
  constructor(private builder: ReportBuilder) {}
  setBuilder(builder: ReportBuilder) { this.builder = builder; }
  constructQuickStart(title: string): string {
    this.builder.reset();
    this.builder.setTitle(title);
    this.builder.addSection('Introduction');
    this.builder.addSection('Usage');
    this.builder.addSection('Next Steps');
    return this.builder.getResult();
  }
}

