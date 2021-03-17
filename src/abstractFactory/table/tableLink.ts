import { Link } from 'abstractFactory/factory/link';

export class TableLink extends Link {
  public constructor(caption: string, url: string) {
    super(caption, url);
  }
  public makeHTML(): string {
    return `<td><a href=\"${this.url}\">${this.caption}</a></td>`;
  }
}
