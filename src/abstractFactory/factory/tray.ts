import { Item } from 'abstractFactory/factory/item';

export abstract class Tray extends Item {
  protected tray: Item[] = [];
  public constructor(caption: string) {
    super(caption);
  }
  public add(item: Item): void {
    this.tray.push(item);
  }
}
