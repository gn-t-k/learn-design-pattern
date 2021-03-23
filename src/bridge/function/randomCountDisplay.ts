import { CountDisplay } from 'bridge/function/countDisplay';
import { DisplayImpl } from 'bridge/implementation/displayImpl';
import { generateRandomNumber } from 'bridge/util/generateRandomNumber';

export class RandomCountDisplay extends CountDisplay {
  public constructor(impl: DisplayImpl) {
    super(impl);
  }
  public randomDisplay(times: number): string {
    const random = generateRandomNumber(times);
    return this.multiDisplay(random);
  }
}
