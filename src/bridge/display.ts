import { DisplayImpl } from 'bridge/displayImpl';

export class Display {
  private impl: DisplayImpl;
  public constructor(impl: DisplayImpl) {
    this.impl = impl;
  }
  public open(): string {
    return this.impl.rawOpen();
  }
  public print(): string {
    return this.impl.rawPrint();
  }
  public close(): string {
    return this.impl.rawClose();
  }
  public display(): string {
    const string: string[] = [];
    string.push(this.open());
    string.push(this.print());
    string.push(this.close());
    return string.join('\n');
  }
}
