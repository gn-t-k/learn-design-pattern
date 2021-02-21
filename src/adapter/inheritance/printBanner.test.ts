import { PrintBanner } from 'adapter/inheritance/printBanner';
import { Print } from 'adapter/inheritance/print';

describe('PrintBanner', () => {
  const p: Print = new PrintBanner('Hello');

  test('printWeak', () => {
    expect(p.printWeak()).toEqual('(Hello)');
  });

  test('printStrong', () => {
    expect(p.printStrong()).toEqual('*Hello*');
  });
});
