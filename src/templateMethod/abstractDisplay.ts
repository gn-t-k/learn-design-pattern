export abstract class AbstractDisplay {
  public abstract open(): string;
  public abstract print(): string;
  public abstract close(): string;
  public display(): string {
    const open = this.open();
    let print = '';
    for (let i = 0; i < 5; i++) {
      this.print();
      print += this.print();
    }
    const close = this.close();

    return open + print + close;
  }
}
