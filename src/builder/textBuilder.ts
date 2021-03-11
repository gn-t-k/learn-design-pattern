import { Builder } from 'builder/builder';

export class TextBuilder implements Builder {
  private sentence: string[] = [];
  public makeTitle(title: string): void {
    this.sentence.push('====================\n');
    this.sentence.push(`「${title}」\n`);
  }
  public makeString(str: string): void {
    this.sentence.push(`■${str}\n`);
  }
  public makeItems(items: string[]): void {
    items.forEach((item) => this.sentence.push(`・${item}\n`));
  }
  public close(): void {
    this.sentence.push('====================\n');
  }
  public getResult(): string {
    return this.sentence.join('');
  }
}
