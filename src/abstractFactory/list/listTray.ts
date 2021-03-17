import { Item } from 'abstractFactory/factory/item';
import { Tray } from 'abstractFactory/factory/tray';

export class ListTray extends Tray {
  public constructor(caption: string) {
    super(caption);
  }
  public makeHTML(): string {
    const html: string[] = [];
    html.push('<li>');
    html.push(`${this.caption}`);
    html.push('<ul>');
    this.tray.map((item: Item) => {
      html.push(item.makeHTML());
    });
    html.push('</ul>');
    html.push('</li>');

    return html.join('\n');
  }
}
