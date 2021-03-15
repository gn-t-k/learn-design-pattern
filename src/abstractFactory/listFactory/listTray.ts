import { Item } from 'abstractFactory/factory/item';
import { Tray } from 'abstractFactory/factory/tray';

export class ListTray extends Tray {
  public constructor(caption: string) {
    super(caption);
  }
  public makeHTML(): string {
    const html: string[] = [];
    html.push('<li>\n');
    html.push(`${this.caption}\n`);
    html.push('<ul>\n');
    this.tray.map((item: Item) => {
      html.push(item.makeHTML());
    });
    html.push('</ul>\n');
    html.push('</li>\n');

    return html.join('');
  }
}
