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

    expect(html).toEqual(`<html><head><title>LinkPage</title></head>
<body>
<h1>LinkPage</h1>
<ul>
<li>
新聞
<ul>
<li><a href=\"https://www.asahi.com/\">朝日新聞</a></li>
<li><a href=\"https://www.yomiuri.co.jp/\">読売新聞</a></li>
</ul>
</li>
<li>
サーチエンジン
<ul>
<li><a href=\"https://www.yahoo.co.jp/\">Yahoo!</a></li>
<li><a href=\"https://www.google.com/\">Google</a></li>
</ul>
</li>
</ul>
<hr><address>結城浩</address>
</body></html>`);
  });

  test('TableFactory', () => {
    const tableFactory: Factory = Factory.getFactory('TableFactory');

    const asahi: Link = tableFactory.createLink(
      '朝日新聞',
      'https://www.asahi.com/',
    );
    const yomiuri: Link = tableFactory.createLink(
      '読売新聞',
      'https://www.yomiuri.co.jp/',
    );
    const yahoo: Link = tableFactory.createLink(
      'Yahoo!',
      'https://www.yahoo.co.jp/',
    );
    const google: Link = tableFactory.createLink(
      'Google',
      'https://www.google.com/',
    );

    const newsTray: Tray = tableFactory.createTray('新聞');
    newsTray.add(asahi);
    newsTray.add(yomiuri);
    const searchTray: Tray = tableFactory.createTray('サーチエンジン');
    searchTray.add(yahoo);
    searchTray.add(google);

    const page: Page = tableFactory.createPage('LinkPage', '結城浩');
    page.add(newsTray);
    page.add(searchTray);
    const html = page.makeHTML();

    expect(html).toEqual(`<html><head><title>LinkPage</title></head>
<body>
<h1>LinkPage</h1>
<table width=\"80%\" border=\"3\"
<tr><td>
table width=\"100%\" border=\"1\"><tr>
<td bgcolor=\"#cccccc\" align=\"center\" colspan=\"2\"><b>新聞</b></td>
</tr>
<tr>
<td><a href=\"https://www.asahi.com/\">朝日新聞</a></td>
<td><a href=\"https://www.yomiuri.co.jp/\">読売新聞</a></td>
</tr></table>
</td></tr>
<tr><td>
table width=\"100%\" border=\"1\"><tr>
<td bgcolor=\"#cccccc\" align=\"center\" colspan=\"2\"><b>サーチエンジン</b></td>
</tr>
<tr>
<td><a href=\"https://www.yahoo.co.jp/\">Yahoo!</a></td>
<td><a href=\"https://www.google.com/\">Google</a></td>
</tr></table>
</td></tr>
</table>
<hr><address>結城浩</address>
</body></html>`);
  });
});
