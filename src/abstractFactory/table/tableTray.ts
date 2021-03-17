import { Item } from 'abstractFactory/factory/item';
import { Tray } from 'abstractFactory/factory/tray';

export class TableTray extends Tray {
  public constructor(caption: string) {
    super(caption);
  }
  public makeHTML(): string {
    const html: string[] = [];
    html.push('<td>');
    html.push('table width="100%" border="1"><tr>');
    html.push(
      `<td bgcolor=\"#cccccc\" align=\"center\" colspan=\"${this.tray.length}\"><b>${this.caption}</b></td>`,
    );
    html.push('</tr>');
    html.push('<tr>');
    this.tray.map((item: Item) => {
      html.push(item.makeHTML());
    });
    html.push('</tr></table>');
    html.push('</td>');

    return html.join('\n');
  }
}
