export abstract class Item {
  protected caption: string;
  public constructor(caption: string) {
    this.caption = caption;
  }
  public abstract makeHTML(): string;
}
