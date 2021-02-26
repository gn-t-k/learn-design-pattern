# Adapterパターン

## 概要

Adapterパターンは、既に提供されているクラス等を使いたいがそのままでは使えないとき、必要な形に変換してから利用するための文字通り「アダプター」を提供するデザインパターン。

## サンプルプログラム

結城浩先生の[増補改訂版Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9/dp/4797327030)のJavaプログラムをTypeScriptで写経した。

以下のような`Banner`クラスが用意されているとする。

```typescript
export class Banner {
  private string: string;

  public constructor(string: string) {
    this.string = string;
  }

  public showWithParen(): string {
    return `(${this.string})`;
  }

  public showWithAster(): string {
    return `*${this.string}*`;
  }
}
```

`Banner`は、文字列をカッコでくくって表示する`showWithParen`メソッド、文字列をアスタリスクでくくって表示する`showWithAster`を持つ。

一方で、`Bannar`を利用する側で`Print`インターフェースが以下のように宣言されているとする。

```typescript
interface Print {
  printWeak(): string;
  printStrong(): string;
}
```

`Print`インターフェースは、文字列を弱く（カッコでくくって）表示する`printWeak`メソッド、文字列を強く（アスタリスクでくくって）表示する`printStrong`メソッドを持つ。

以下のようにアダプター`PrintBanner`を使って、（`Banner`によって実装された）`Print`を利用できるようにしたい。

```typescript
import { PrintBanner } from 'adapter/inheritance/printBanner';
import { Print } from 'adapter/inheritance/print';

describe('PrintBanner', () => {
  const p: Print = new PrintBanner('Hello');

  test('printWeak', () => {
    expect(p.printWeak()).toEqual('(Hello)');
  });

  test('printStrong', () => {
    expect(p.printStrong()).toEqual('*Hello*');
  });
});
```

`PrintBanner`は、`Banner`を使って`Print`インターフェースを実装するためのアダプターである。

継承を使ったAdapterパターンと委譲を使ったAdapterパターンの2パターンを紹介する。

### 継承を使ったパターン

継承を使ったパターンでは、以下のようにアダプター`PrintBanner`クラスを用意する。

```typescript
import { Banner } from 'adapter/bannar';
import { Print } from 'adapter/inheritance/print';

export class PrintBanner extends Banner implements Print {
  public constructor(string: string) {
    super(string);
  }

  public printWeak(): string {
    return this.showWithParen();
  }

  public printStrong(): string {
    return this.showWithAster();
  }
}
```

`extends`を使い`PrintBanner`に`showWithParen`と`showWithAster`を持たせ、それらを`printWeak`、`printStrong`として使えるようにしている。

### 委譲を使ったパターン

`Print`がインターフェースではなくクラスだった場合、委譲を使ったパターンを適用できる。

```typescript
export abstract class Print {
  public abstract printWeak(): string;
  public abstract printStrong(): string;
}
```

委譲を使ったパターンでは、以下のようにアダプター`PrintBanner`クラスを用意する。

```typescript
import { Banner } from 'adapter/bannar';
import { Print } from 'adapter/delegation/print';

export class PrintBanner extends Print {
  private banner: Banner;

  public constructor(string: string) {
    super();
    this.banner = new Banner(string);
  }

  public printWeak(): string {
    return this.banner.showWithParen();
  }

  public printStrong(): string {
    return this.banner.showWithAster();
  }
}
```

`PrintBanner`クラスのプロパティに`Banner`のインスタンス`banner`を用意し、それらを使って`printWeak`、`printStrong`を実装している。

## 考察・感想

テストの内容は、本の中でmainクラスとして書かれている内容をテストの形に落とし込んだもの。本の中のmainクラスで`PrintBanner`のインスタンス`p`を`PrintBanner`型ではなく`Print`型にしているのがなるほどな〜と思った。「pはPrintのプロパティ・メソッドだけを持っていますよ」という意図が示せている。
