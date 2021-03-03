import { Factory } from 'factoryMethod/framework/factory';
import { Product } from 'factoryMethod/framework/product';
import { IDCardFactory } from 'factoryMethod/idcard/IDCardFactory';

describe('Factory Method', () => {
  const factory: Factory = new IDCardFactory();
  const card: Product = factory.create('結城浩');

  test('use', () => {
    expect(card.use()).toEqual('結城浩のカードを使います');
  });

  test('owners', () => {
    const owners = (factory as IDCardFactory).getOwners();
    expect(owners).toEqual(['結城浩']);
  });
});
