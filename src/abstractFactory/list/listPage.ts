import { Page } from 'abstractFactory/factory/page';

export class ListPage extends Page {
  public constructor(title: string, author: string) {
    super(title, author);
  }
  public makeHTML(): string {
    const html: string[] = [];
    html.push(`<html><head><title>${this.title}</title></head>`);
    html.push('<body>');
    html.push(`<h1>${this.title}</h1>`);
    html.push('<ul>');
    this.content.map((item) => {
      html.push(item.makeHTML());
    });
    html.push('</ul>');
    html.push(`<hr><address>${this.author}</address>`);
    html.push('</body></html>');
    return html.join('\n');
  }
}
