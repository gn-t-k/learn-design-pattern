import { Builder } from 'builder/builder';

export class HTMLBuilder implements Builder {
  private html: string[] = [];
  public makeTitle(title: string): void {
    this.html.push(`<html><head><title>${title}</title></head><body>`);
    this.html.push(`<h1>${title}</h1>`);
  }
  public makeString(str: string): void {
    this.html.push(`<p>${str}</p>`);
  }
  public makeItems(items: string[]): void {
    this.html.push('<ul>');
    items.forEach((item) => {
      this.html.push(`<li>${item}<li/>`);
    });
    this.html.push('</ul>');
  }
  public close(): void {
    this.html.push('</body></html>');
  }
  public getResult(): string {
    return this.html.join('');
  }
}
