import { Link } from 'abstractFactory/factory/link';
import { Tray } from 'abstractFactory/factory/tray';
import { Page } from 'abstractFactory/factory/page';

type FactoryType = 'ListFactory' | 'TableFactory';

export abstract class Factory {
  public static getFactory(className: FactoryType): Factory {
    switch (className) {
      case 'ListFactory':
        return new ListFactory();
      case 'TableFactory':
        return new TableFactory();
    }
  }
  public abstract createLink(caption: string, url: string): Link;
  public abstract createTray(caption: string): Tray;
  public abstract createPage(title: string, author: string): Page;
}

import { ListLink } from 'abstractFactory/list/listLink';
import { ListPage } from 'abstractFactory/list/listPage';
import { ListTray } from 'abstractFactory/list/listTray';

class ListFactory extends Factory {
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

import { TableLink } from 'abstractFactory/table/tableLink';
import { TablePage } from 'abstractFactory/table/tablePage';
import { TableTray } from 'abstractFactory/table/tableTray';

class TableFactory extends Factory {
  public createLink(caption: string, url: string): Link {
    return new TableLink(caption, url);
  }
  public createTray(caption: string): Tray {
    return new TableTray(caption);
  }
  public createPage(title: string, author: string): Page {
    return new TablePage(title, author);
  }
}
