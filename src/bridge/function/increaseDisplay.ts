import { DisplayImpl } from 'bridge/implementation/displayImpl';
import { CountDisplay } from './countDisplay';

export class IncreaseDisplay extends CountDisplay {
  private step: number;
  public constructor(impl: DisplayImpl, step: number) {
    super(impl);
    this.step = step;
  }
  public increaseDisplay(level: number): string {
    const string = [];
    let count = 0;
    for (let i = 0; i < level; i++) {
      string.push(this.multiDisplay(count));
      count += this.step;
    }

    return string.join('\n');
  }
}
