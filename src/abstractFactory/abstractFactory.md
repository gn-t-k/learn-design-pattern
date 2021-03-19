# Abstract Factoryパターン

## 概要

[Factory Methodパターン](https://gntk.dev/post/20210304-learn-gof-design-pattern-factory-mehod)で紹介したインスタンスの生成を、抽象化して複数パターン用意するためのデザインパターン。

## サンプルプログラム

階層構造を持ったリンク集のHTMLを出力するためのサンプルプログラム。以下のテストのように使用する。

```typescript
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
```

1. `Factory.getFactory('FactoryName')`でFactoryを指定※
2. ファクトリのインスタンス`createLink`でURLとテキストを持つリンクを作る
3. ファクトリのインスタンス`createTray`でリンクを分類するトレイを作る
4. ファクトリのインスタンス`createPage`で、トレイをまとめるページを作る
5. `page.makeHTML()`でhtmlを出力する

※このサンプルプログラムでは、ulタグとliタグによる階層構造のファクトリと、tableタグによる階層構造のファクトリから選べる。

### ファクトリ

階層構造を持つhtmlを出力するためのファクトリは、どのような階層構造であろうと必要になるリンク・トレイ・ページを作るためのメソッドを持っているため、その抽象クラスを用意する必要がある。

```typescript
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
```

`Factory`がファクトリの抽象クラスで、それをul・liなのか、tableなのかで具象にしたものが`ListFactory`と`TableFactory`。

`Factory`はstaticメソッド`getFactory`を持っており、渡された引数に応じて具体的なファクトリのインスタンスを返す。

ファクトリは`Link`、`Tray`、`Page`といった、抽象化された共通のインターフェースのメソッドを持っている。

### 共通のメソッドのインターフェース

リンク・トレイ・ページの抽象クラス郡。

```typescript
export abstract class Item {
  protected caption: string;
  public constructor(caption: string) {
    this.caption = caption;
  }
  public abstract makeHTML(): string;
}
```

htmlを組み立てるための部品の最小単位。

```typescript
import { Item } from 'abstractFactory/factory/item';

export abstract class Link extends Item {
  protected url: string;
  public constructor(caption: string, url: string) {
    super(caption);
    this.url = url;
  }
}
```

リンク。Itemを継承している。

```typescript
import { Item } from 'abstractFactory/factory/item';

export abstract class Tray extends Item {
  protected tray: Item[] = [];
  public constructor(caption: string) {
    super(caption);
  }
  public add(item: Item): void {
    this.tray.push(item);
  }
}
```

トレイ。Itemの配列を持っており、`add`でItemを配列に追加できる。

```typescript
import { Item } from 'abstractFactory/factory/item';

export abstract class Page {
  protected title: string;
  protected author: string;
  protected content: Item[] = [];
  public constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }
  public add(item: Item): void {
    this.content.push(item);
  }
  public abstract makeHTML(): string;
}
```

ページ。ページのタイトルと著者、ページのコンテンツを持っている。ページのコンテンツは`add`で追加できる。

### 具体的なファクトリの実装

#### ListFactory

ul・liによる階層構造を持ったhtmlを出力するファクトリ。クラスのコードは上記`### ファクトリ`のセクションに載せたもの。ListFactoryの`createXxx`が返すインスタンスは、`Link`、`Tray`、`Page`を以下のように実装している。

```typescript
import { Link } from 'abstractFactory/factory/link';

export class ListLink extends Link {
  public constructor(caption: string, url: string) {
    super(caption, url);
  }
  public makeHTML(): string {
    return `<li><a href=\"${this.url}\">${this.caption}</a></li>`;
  }
}
```

```typescript
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
```

```typescript
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
```

#### TableFactory

TableFactoryの`createXxx`が返すインスタンスは、`Link`、`Tray`、`Page`を以下のように実装している。

```typescript
import { Link } from 'abstractFactory/factory/link';

export class TableLink extends Link {
  public constructor(caption: string, url: string) {
    super(caption, url);
  }
  public makeHTML(): string {
    return `<td><a href=\"${this.url}\">${this.caption}</a></td>`;
  }
}
```

```typescript
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
```

```typescript
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
```

## 感想・考察

- 登場する役が多くて理解するのがけっこう大変だった。
- JavaのコードそのままTypeScriptに変換できないものがいくつかあったので工夫した。
  - 本だと`Factory`では受け取ったクラス名の文字列`className`を`java.lang.Class.forName('className').newInstance()`してインスタンスにしていた。
  - 本だと`Factory`クラスと`ListFactory`・`TableFactory`は別ファイルにしていたが、TypeScriptだとできなかったので一緒のファイルにした。
    - 上記の`forName`が無い問題のせいで、`ListFactory`などを参照せねばならない。
    - `Factory`が`ListFactory`を参照→`ListFactory`が`Factory`を参照（継承のため）の循環参照が発生してしまう。
    - というかJavaだとなんでこれできるのか。
