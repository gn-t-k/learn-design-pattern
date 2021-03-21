import { Display } from 'bridge/function/display';
import { StringDisplayImpl } from 'bridge/implementation/stringDisplayImpl';
import { CountDisplay } from 'bridge/function/countDisplay';
import { generateRandomNumber } from './util/generateRandomNumber';

describe('bridge', () => {
  test('display', () => {
    const display: Display = new Display(
      new StringDisplayImpl('Hello, Japan.'),
    );
    expect(display.display()).toEqual(`+-------------+
|Hello, Japan.|
+-------------+`);
  });

  test('multi display', () => {
    const display: CountDisplay = new CountDisplay(
      new StringDisplayImpl('Hello, world'),
    );
    expect(display.multiDisplay(5)).toEqual(`+------------+
|Hello, world|
|Hello, world|
|Hello, world|
|Hello, world|
|Hello, world|
+------------+`);
  });
});
