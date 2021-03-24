import { Display } from 'bridge/function/display';
import { StringDisplayImpl } from 'bridge/implementation/stringDisplayImpl';
import { CountDisplay } from 'bridge/function/countDisplay';
import { RandomCountDisplay } from 'bridge/function/randomCountDisplay';
import * as randomModule from 'bridge/util/generateRandomNumber';
import { IncreaseDisplay } from 'bridge/function/increaseDisplay';
import { CharDisplayImpl } from './implementation/charDisplayImpl';

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
    // 毎回ランダムに表示されたらテストにならないので、テストのときは3回に固定
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

  test('print bar', () => {
    const display1: IncreaseDisplay = new IncreaseDisplay(
      new CharDisplayImpl('<', '*', '>'),
      1,
    );
    expect(display1.increaseDisplay(5)).toEqual(`<>
<*>
<**>
<***>
<****>
`);

    const display2: IncreaseDisplay = new IncreaseDisplay(
      new CharDisplayImpl('<', '-', '>'),
      3,
    );
    expect(display2.increaseDisplay(5)).toEqual(`<>
<--->
<------>
<--------->
<------------>
`);
  });
});
