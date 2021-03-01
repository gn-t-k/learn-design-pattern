import { AbstractDisplay } from 'templateMethod/abstractDisplay';

export class CharDisplay extends AbstractDisplay {
  private ch: string;

  public constructor(ch: string) {
    super();
    this.ch = ch;
  }

  public open(): string {
    return '<<';
  }

  public print(): string {
    return this.ch;
  }

  public close(): string {
    return '>>';
  }
}
