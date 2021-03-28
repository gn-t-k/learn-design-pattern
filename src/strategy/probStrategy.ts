import { generateRandomNumber } from 'bridge/util/generateRandomNumber';
import { Strategy } from 'strategy/strategy';
import { Hand } from 'strategy/hand';

export class ProbStrategy implements Strategy {
  private random: (limit: number) => number;
  private prevHandValue: number = 0;
  private currentHandValue: number = 0;
  private history: number[][] = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  public constructor() {
    this.random = generateRandomNumber;
  }
  public nextHand(): Hand {
    const bet: number = this.random(this.getSum(this.currentHandValue));
    let handValue = 0;
    if (bet < this.history[this.currentHandValue][0]) {
      handValue = 0;
    } else if (
      bet <
      this.history[this.currentHandValue][0] +
        this.history[this.currentHandValue][1]
    ) {
      handValue = 1;
    } else {
      handValue = 2;
    }
    this.prevHandValue = this.currentHandValue;
    this.currentHandValue = handValue;
    return Hand.getHand(handValue);
  }
  private getSum(hv: number): number {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += this.history[hv][i];
    }
    return sum;
  }
  public study(win: boolean): void {
    if (win) {
      this.history[this.prevHandValue][this.currentHandValue]++;
    } else {
      this.history[this.prevHandValue][(this.currentHandValue + 1) % 3]++;
      this.history[this.prevHandValue][(this.currentHandValue + 2) % 3]++;
    }
  }
}
