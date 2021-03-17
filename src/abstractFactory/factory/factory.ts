import { Link } from 'abstractFactory/factory/link';
import { Tray } from 'abstractFactory/factory/tray';
import { Page } from 'abstractFactory/factory/page';
import { ListFactory } from 'abstractFactory/listFactory/listFactory';

export type FactoryType = 'ListFactory';

export abstract class Factory {
  public static getFactory(className: FactoryType): Factory {
    switch (className) {
      case 'ListFactory':
        return new ListFactory();
    }
  }
  public abstract createLink(caption: string, url: string): Link;
  public abstract createTray(caption: string): Tray;
  public abstract createPage(title: string, author: string): Page;
}
