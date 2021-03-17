import { Item } from 'abstractFactory/factory/item';
import { Page } from 'abstractFactory/factory/page';

export class TablePage extends Page {
  public constructor(title: string, author: string) {
    super(title, author);
  }
  public makeHTML(): string {
    const html: string[] = [];
    html.push(`<html><head><title>${this.title}</title></head>`);
    html.push('<body>');
    html.push(`<h1>${this.title}</h1>`);
    html.push('<table width="80%" border="3"');
    this.content.map((item: Item) => {
      html.push(`<tr>${item.makeHTML()}</tr>`);
    });
    html.push('</table>');
    html.push(`<hr><address>${this.author}</address>`);
    html.push('</body></html>');
    return html.join('\n');
  }
}
