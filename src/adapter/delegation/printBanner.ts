import { Banner } from 'adapter/bannar';
import { Print } from 'adapter/delegation/print';

export class PrintBanner extends Print {
  private banner: Banner;

  public constructor(string: string) {
    super();
    this.banner = new Banner(string);
  }

  public printWeak(): string {
    return this.banner.showWithParen();
  }

  public printStrong(): string {
    return this.banner.showWithAster();
  }
}
