import { Display } from 'bridge/function/display';
import { DisplayImpl } from 'bridge/implementation/displayImpl';

export class CountDisplay extends Display {
  public constructor(impl: DisplayImpl) {
    super(impl);
  }
  public multiDisplay(times: number): string {
    const string: string[] = [];
    string.push(this.open());
    for (let i = 0; i < times; i++) {
      string.push(this.print());
    }
    string.push(this.close());
    return string.join('');
  }
}
