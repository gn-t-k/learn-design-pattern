import { Product } from 'factoryMethod/framework/product';

export class IDCard extends Product {
  private owner: string;

  constructor(owner: string) {
    super();
    console.log(`${owner}のカードを作ります`);
    this.owner = owner;
  }

  public use(): string {
    return `${this.owner}のカードを使います`;
  }
  public getOwner(): string {
    return this.owner;
  }
}
