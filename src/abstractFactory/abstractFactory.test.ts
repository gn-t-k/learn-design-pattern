import { Factory } from 'abstractFactory/factory/factory';
import { Link } from 'abstractFactory/factory/link';
import { Page } from 'abstractFactory/factory/page';
import { Tray } from 'abstractFactory/factory/tray';

describe('Abstract Factory', () => {
  test('ListFactory', () => {
    const listFactory: Factory = Factory.getFactory('ListFactory');

    const asahi: Link = listFactory.createLink(
      '朝日新聞',
      'https://www.asahi.com/',
    );
    const yomiuri: Link = listFactory.createLink(
      '読売新聞',
      'https://www.yomiuri.co.jp/',
    );
    const yahoo: Link = listFactory.createLink(
      'Yahoo!',
      'https://www.yahoo.co.jp/',
    );
    const google: Link = listFactory.createLink(
      'Google',
      'https://www.google.com/',
    );

    const newsTray: Tray = listFactory.createTray('新聞');
    newsTray.add(asahi);
    newsTray.add(yomiuri);
    const searchTray: Tray = listFactory.createTray('サーチエンジン');
    searchTray.add(yahoo);
    searchTray.add(google);

    const page: Page = listFactory.createPage('LinkPage', '結城浩');
    page.add(newsTray);
    page.add(searchTray);
    const html = page.makeHTML();

    expect(html).toEqual('');
  });
});
