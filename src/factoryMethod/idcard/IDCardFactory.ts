import { Factory } from 'factoryMethod/framework/factory';
import { Product } from 'factoryMethod/framework/product';
import { IDCard } from 'factoryMethod/idcard/IDCard';

export class IDCardFactory extends Factory {
  private owners: string[] = [];
  protected createProduct(owner: string): Product {
    return new IDCard(owner);
  }
  protected registerProduct(product: Product): void {
    this.owners.push((product as IDCard).getOwner());
  }
  public getOwners(): string[] {
    return this.owners;
  }
}
