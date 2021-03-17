import { Factory } from 'abstractFactory/factory/factory';
import { Link } from 'abstractFactory/factory/link';
import { Page } from 'abstractFactory/factory/page';
import { Tray } from 'abstractFactory/factory/tray';
import { ListLink } from 'abstractFactory/listFactory/listLink';
import { ListPage } from 'abstractFactory/listFactory/listPage';
import { ListTray } from 'abstractFactory/listFactory/listTray';

export class ListFactory extends Factory {
  public createLink(caption: string, url: string): Link {
    return new ListLink(caption, url);
  }
  public createTray(caption: string): Tray {
    return new ListTray(caption);
  }
  public createPage(title: string, author: string): Page {
    return new ListPage(title, author);
  }
}
