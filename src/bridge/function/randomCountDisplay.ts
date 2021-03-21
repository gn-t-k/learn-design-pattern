import { CountDisplay } from 'bridge/function/countDisplay';
import { DisplayImpl } from 'bridge/implementation/displayImpl';

export class RandomCountDisplay extends CountDisplay {
  public constructor(impl: DisplayImpl) {
    super(impl);
  }
  public randomDisplay(times: number): string {
    const rundom = (times: number) => times;
    return this.multiDisplay(rundom(times));
  }
}
