import { Strategy } from 'strategy/strategy';
import { generateRandomNumber } from 'strategy/util/generateRandomNumber';
import { Hand } from 'strategy/hand';

export class WinningStrategy implements Strategy {
  private random: (limit: number) => number;
  private won: boolean = false;
  private prevHand: Hand = Hand.getHand(0);
  public constructor() {
    this.random = generateRandomNumber;
  }
  public nextHand(): Hand {
    if (!this.won) {
      this.prevHand = Hand.getHand(this.random(2));
    }
    return this.prevHand;
  }
  public study(win: boolean): void {
    this.won = win;
  }
}
