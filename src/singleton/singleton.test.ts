import { Singleton } from 'singleton/singleton';

describe('singleton', () => {
  const obj1: Singleton = Singleton.getInstance();
  const obj2: Singleton = Singleton.getInstance();

  test('singletonから同じインスタンスが作られる', () => {
    expect(obj1 === obj2).toBe(true);
  });
});
