import { AbstractDisplay } from 'templateMethod/abstractDisplay';

export class StringDisplay extends AbstractDisplay {
  private string: string;
  private width: number;

  constructor(string: string) {
    super();
    this.string = string;
    this.width = string.length;
  }

  public open(): string {
    return this.printLine();
  }

  public print(): string {
    return '|' + this.string + '|\n';
  }

  public close(): string {
    return this.printLine();
  }

  private printLine(): string {
    let line = '';
    for (let i = 0; i < this.width; i++) {
      line += '-';
    }
    return '+' + line + '+\n';
  }
}
