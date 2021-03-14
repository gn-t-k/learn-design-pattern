import { Item } from 'abstractFactory/factory/item';

export abstract class Page {
  protected title: string;
  protected author: string;
  protected content: Item[] = [];
  public constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }
  public add(item: Item): void {
    this.content.push(item);
  }
  public output(): string {
    return `${this.title}を作成しました`;
  }
  public abstract makeHTML(): string;
}
