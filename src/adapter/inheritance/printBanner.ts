import { Banner } from 'adapter/bannar';
import { Print } from 'adapter/inheritance/print';

export class PrintBanner extends Banner implements Print {
  public constructor(string: string) {
    super(string);
  }

  public printWeak(): string {
    return this.showWithParen();
  }

  public printStrong(): string {
    return this.showWithAster();
  }
}
