import { DisplayImpl } from 'bridge/implementation/displayImpl';

export class StringDisplayImpl extends DisplayImpl {
  private string: string;
  private width: number;
  public constructor(string: string) {
    super();
    this.string = string;
    this.width = string.length;
  }
  public rawOpen(): string {
    return `${this.printLine()}\n`;
  }
  public rawPrint(): string {
    return `|${this.string}|\n`;
  }
  public rawClose(): string {
    return this.printLine();
  }
  private printLine(): string {
    const string: string[] = [];
    string.push('+');
    for (let i = 0; i < this.width; i++) {
      string.push('-');
    }
    string.push('+');

    return string.join('');
  }
}
