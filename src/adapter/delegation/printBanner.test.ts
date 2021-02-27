import { PrintBanner } from 'adapter/delegation/printBanner';
import { Print } from 'adapter/delegation/print';

describe('PrintBannar', () => {
  const p: Print = new PrintBanner('Hello');

  test('printWeak', () => {
    expect(p.printWeak()).toEqual('(Hello)');
  });

  test('printStrong', () => {
    expect(p.printStrong()).toEqual('*Hello*');
  });
});
