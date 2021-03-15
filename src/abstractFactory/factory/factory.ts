import { Link } from 'abstractFactory/factory/link';
import { Tray } from 'abstractFactory/factory/tray';
import { Page } from 'abstractFactory/factory/page';

export abstract class Factory {
  public static getFactory(classname: string): Factory {}
  public abstract createLink(caption: string, url: string): Link;
  public abstract createTray(caption: string): Tray;
  public abstract createPage(title: string, author: string): Page;
}
