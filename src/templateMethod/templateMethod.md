# Template Methodパターン

## 概要

Template Methodは、スーパークラスにいくつかの抽象メソッドを用意して処理の枠組みを決め、サブクラスでそれらを実装して具体的な処理を決定するデザインパターン。

## サンプルプログラム

結城浩先生の[増補改訂版Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9/dp/4797327030)のJavaプログラムをTypeScriptで写経した。

以下のようなスーパークラス`AbstractDisplay`を用意する。

```typescript
export abstract class AbstractDisplay {
  public abstract open(): string;
  public abstract print(): string;
  public abstract close(): string;
  public display(): string {
    const open = this.open();
    let print = '';
    for (let i = 0; i < 5; i++) {
      this.print();
      print += this.print();
    }
    const close = this.close();

    return open + print + close;
  }
}
```

文字列を5回繰り返してカッコなどの装飾をつけて表示するためのスーパークラスである。どのような装飾をつけるかは、サブクラスの実装による。

サブクラス`CharDisplay`を以下のように実装する。

```typescript
import { AbstractDisplay } from 'templateMethod/abstractDisplay';

export class CharDisplay extends AbstractDisplay {
  private ch: string;

  public constructor(ch: string) {
    super();
    this.ch = ch;
  }

  public open(): string {
    return '<<';
  }

  public print(): string {
    return this.ch;
  }

  public close(): string {
    return '>>';
  }
}
```

以下のテストが通る。

```typescript
  test('charDisplay', () => {
    const charDisplay: AbstractDisplay = new CharDisplay('H');
    const actual = charDisplay.display();
    const expected = '<<HHHHH>>';

    expect(actual).toEqual(expected);
  });
```

サブクラス`StringDisplay`を以下のように実装する。

```typescript
import { AbstractDisplay } from 'templateMethod/abstractDisplay';

export class StringDisplay extends AbstractDisplay {
  private string: string;
  private width: number;

  constructor(string: string) {
    super();
    this.string = string;
    this.width = string.length;
  }

  public open(): string {
    return this.printLine();
  }

  public print(): string {
    return '|' + this.string + '|\n';
  }

  public close(): string {
    return this.printLine();
  }

  private printLine(): string {
    let line = '';
    for (let i = 0; i < this.width; i++) {
      line += '-';
    }
    return '+' + line + '+\n';
  }
}
```

以下のテストが通る。

```typescript
  test('stringDisplay', () => {
    const stringDisplay: AbstractDisplay = new StringDisplay('Hello, World');
    const actual = stringDisplay.display();
    const expected = `+------------+
|Hello, World|
|Hello, World|
|Hello, World|
|Hello, World|
|Hello, World|
+------------+
`;

    expect(actual).toEqual(expected);
  });
```

## 考察・感想

本のJavaプログラムだと、`AbstractDisplay`の`display`メソッドは`final`がついていてオーバーライド禁止になっていたが、typescriptでそれを表現する方法がわからなかった。[この記事](https://qiita.com/suin/items/4a4582083f64171116f9)では`ReadOnly<T>`型のインスタンスを返すファクトリメソッドを用意する方法でメソッドをオーバーライド禁止にしている。ちょうど次回はファクトリメソッド。
