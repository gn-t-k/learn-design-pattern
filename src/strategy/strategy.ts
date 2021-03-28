import { Hand } from 'strategy/hand';

export interface Strategy {
  nextHand(): Hand;
  study(win: boolean): void;
}
