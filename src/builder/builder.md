# Builderパターン

## 概要

全体を構成するための各部品を定義・作成し、それらを段階を踏んで組み上げるためのパターン。まず部品の抽象クラスを用意し、それらを実装するクラスをいくつか作る。組み上げの段階では抽象クラスのみを知っているクラスによって部品の組み上げが行われる。

## サンプルコード

結城浩先生の[増補改訂版Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9/dp/4797327030)のJavaプログラムをTypeScriptで写経した。

Builderパターンを使ってテキスト文書とhtml文書を組み上げるプログラム。登場するクラスは以下の通り。

- 文書に含まれる部品を定義しているBuilderクラス
- テキスト・htmlそれぞれにおけるBuilderクラスの実装としてTextBuilderとHTMLBuilderクラス
- Builderクラスのインスタンスを受け取って文書の構成を組み上げるDirectorクラス

以下のテストのように上記のクラスを利用する。

```typescript
import { Director } from 'builder/director';
import { TextBuilder } from 'builder/textBuilder';
import { HTMLBuilder } from 'builder/htmlBuilder';

describe('Builder', () => {
  test('textBuilder', () => {
    const textBuilder = new TextBuilder();
    const director = new Director(textBuilder);
    director.construct();
    const result = textBuilder.getResult();

    expect(result).toEqual(
      '====================\n「Greeting」\n■朝から昼にかけて\n・おはようございます。\n・こんにちは。\n■夜に\n・こんばんは。\n・おやすみなさい。\n・さようなら。\n====================\n',
    );
  });

  test('htmlBuilder', () => {
    const htmlBuilder = new HTMLBuilder();
    const director = new Director(htmlBuilder);
    director.construct();
    const result = htmlBuilder.getResult();

    expect(result).toEqual(
      '<html><head><title>Greeting</title></head><body><h1>Greeting</h1><p>朝から昼にかけて</p><ul><li>おはようございます。<li/><li>こんにちは。<li/></ul><p>夜に</p><ul><li>こんばんは。<li/><li>おやすみなさい。<li/><li>さようなら。<li/></ul></body></html>',
    );
  });
});
```

### Builderクラス

文書に含まれる部品を定義しているBuilderクラスは以下の通り。

```typescript
export abstract class Builder {
  public abstract makeTitle(title: string): void;
  public abstract makeString(str: string): void;
  public abstract makeItems(items: string[]): void;
  public abstract close(): void;
}
```

文書はタイトル・本文・リスト・締め、の組み合わせで構成されることを定義している。

### Directorクラス

受け取ったBuilderクラスのインスタンスを使い、文書の構成を組み上げる。タイトル→文字列→リスト→文字列→リスト→締めで文書を構成することを定義している。

```typescript
import { Builder } from 'builder/builder';

export class Director {
  private builder: Builder;
  public constructor(builder: Builder) {
    this.builder = builder;
  }
  public construct(): void {
    this.builder.makeTitle('Greeting');
    this.builder.makeString('朝から昼にかけて');
    this.builder.makeItems(['おはようございます。', 'こんにちは。']);
    this.builder.makeString('夜に');
    this.builder.makeItems([
      'こんばんは。',
      'おやすみなさい。',
      'さようなら。',
    ]);
    this.builder.close();
  }
}
```

### TextBuilder・HTMLBuilderクラス

Builderクラスを実装しているTextBuilder・HTMLBuilderクラスは以下の通り。

#### TextBuilderクラス

```typescript
import { Builder } from 'builder/builder';

export class TextBuilder implements Builder {
  private sentence: string[] = [];
  public makeTitle(title: string): void {
    this.sentence.push('====================\n');
    this.sentence.push(`「${title}」\n`);
  }
  public makeString(str: string): void {
    this.sentence.push(`■${str}\n`);
  }
  public makeItems(items: string[]): void {
    items.forEach((item) => this.sentence.push(`・${item}\n`));
  }
  public close(): void {
    this.sentence.push('====================\n');
  }
  public getResult(): string {
    return this.sentence.join('');
  }
}
```

#### HTMLBuilderクラス

```typescript
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
```

## 感想・考察

- BuilderをDirectorが受け取りDirectorの中で`makeXxx`するという操作は、Builderインスタンスのプロパティに対して副作用を起こしているので、あまり好きではなかった
- 上記の理由があるので、`makeXxx`は、インスタンスのプロパティにpushするんではなくて単純に文字列を返す作りにしたほうがいいんではないかと思った
- サンプルコードではTextBuilderやHTMLBuilderがBuilderを`extends`したものになっていた
  - Builderにはabstractなメソッドしか定義されてないので、`extends`ではなく`implements`のほうが適切であると思ったので、そのようにした
