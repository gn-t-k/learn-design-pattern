export class Hand {
  public static readonly HANDVALUE_GUU = 0;
  public static readonly HANDVALUE_CHO = 1;
  public static readonly HANDVALUE_PAA = 2;
  public static readonly hand = [
    new Hand(Hand.HANDVALUE_GUU),
    new Hand(Hand.HANDVALUE_CHO),
    new Hand(Hand.HANDVALUE_PAA),
  ];
  private static readonly handName = ['グー', 'チョキ', 'パー'];

  private handValue: number;
  private constructor(handvalue: number) {
    this.handValue = handvalue;
  }

  public static getHand(handValue: number): Hand {
    return Hand.hand[handValue];
  }
  public isStrongerThan(h: Hand): boolean {
    return this.fight(h) === 1;
  }
  public isWeakerThan(h: Hand): boolean {
    return this.fight(h) === -1;
  }
  private fight(h: Hand): -1 | 0 | 1 {
    if (this === h) return 0;
    if ((this.handValue + 1) % 3 === h.handValue) return 1;
    return -1;
  }
  public toString(): string {
    return Hand.handName[this.handValue];
  }
}
