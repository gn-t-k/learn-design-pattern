export class Banner {
  private string: string;

  public constructor(string: string) {
    this.string = string;
  }

  public showWithParen(): string {
    return `(${this.string})`;
  }

  public showWithAster(): string {
    return `*${this.string}*`;
  }
}
