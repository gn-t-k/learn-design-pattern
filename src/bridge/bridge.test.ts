import { Display } from 'bridge/function/display';
import { StringDisplayImpl } from 'bridge/implementation/stringDisplayImpl';
import { CountDisplay } from 'bridge/function/countDisplay';
import { RandomCountDisplay } from 'bridge/function/randomCountDisplay';
import * as randomModule from 'bridge/util/generateRandomNumber';

describe('bridge', () => {
  test('display', () => {
    const display: Display = new Display(
      new StringDisplayImpl('Hello, Japan.'),
    );
    expect(display.display()).toEqual(`+-------------+
|Hello, Japan.|
+-------------+`);
  });

  test('count display', () => {
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

  test('random count display', () => {
    jest.spyOn(randomModule, 'generateRandomNumber').mockReturnValue(3);

    const display: RandomCountDisplay = new RandomCountDisplay(
      new StringDisplayImpl('Hello, world'),
    );
    expect(display.randomDisplay(5)).toEqual(`+------------+
|Hello, world|
|Hello, world|
|Hello, world|
+------------+`);
  });
});
