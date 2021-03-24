import { DisplayImpl } from 'bridge/implementation/displayImpl';

export class CharDisplayImpl extends DisplayImpl {
  private head: string;
  private body: string;
  private foot: string;
  public constructor(head: string, body: string, foot: string) {
    super();
    this.head = head;
    this.body = body;
    this.foot = foot;
  }
  public rawOpen(): string {
    return this.head;
  }
  public rawPrint(): string {
    return this.body;
  }
  public rawClose(): string {
    return `${this.foot}\n`;
  }
}
