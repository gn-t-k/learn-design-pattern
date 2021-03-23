# Bridgeパターン

## 概要

「機能のクラス階層」と「実装のクラス階層」を橋渡しするためのパターン。

### 機能のクラス階層

あるクラス`Something`に新しい機能を追加するために`Something`のサブクラス`SomethingGood`クラスを作るときにできる階層構造。

- スーパークラスは基本的な機能を持っている
- サブクラスはスーパークラスに新しい機能を追加する

### 実装のクラス階層

ある抽象クラス`AbstractClass`の抽象メソッドを実装したサブクラス`ConcreteClass`を作るときにできる階層構造。

- スーパークラスは抽象メソッドによってインターフェースを規定している
- サブクラスは具象メソッドによってそのインターフェースを実装する

### クラス階層の分離

「機能のクラス階層」と「実装のクラス階層」とが混在している場合、クラス階層が複雑になり見通しが悪くなる。それぞれのクラス階層を独立させ、その橋渡しをするためのデザインパターンがBridgeパターン。

## サンプルコード

結城浩先生の[増補改訂版Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9/dp/4797327030)のJavaプログラムをTypeScriptで写経した。

渡した文字に枠を付けて表示するプログラムを、機能のクラス階層と実装のクラス階層に分離して実装している。

```typescript
import { Display } from 'bridge/function/display';
import { StringDisplayImpl } from 'bridge/implementation/stringDisplayImpl';
import { CountDisplay } from 'bridge/function/countDisplay';

describe('bridge', () => {
  test('display', () => {
    const display: Display = new Display(
      new StringDisplayImpl('Hello, Japan.'),
    );
    expect(display.display()).toEqual(`+-------------+
|Hello, Japan.|
+-------------+`);
  });

  test('multi display', () => {
    const display: CountDisplay = new CountDisplay(
      new StringDisplayImpl('Hello, world'),
    );
    expect(display.multiDisplay(5)).toEqual(`+------------+
|Hello, world|
|Hello, world|
|Hello, world|
|Hello, world|
|Hello, world|
+------------+`);
  });
});
```

`StringDisplayImpl`は渡された文字列を加工して別の文字列を作るという**実装のクラス**。`Display`や`CountDisplay`は`StringDisplayImpl`のインターフェースを使って意味のある文字列のかたまりを表示するという**機能のクラス**。

### 実装のクラス

まずは、文字列を加工して別の文字列を作る実装のインターフェースを用意する。

displayImpl.ts

```typescript
export abstract class DisplayImpl {
  public abstract rawOpen(): string;
  public abstract rawPrint(): string;
  public abstract rawClose(): string;
}
```

このインターフェースを使って、実装のクラスを作ったり、機能のクラスから利用したりする。実装のクラスは以下の通り。

stringDisplayImpl.ts

```typescript
import { DisplayImpl } from 'bridge/implementation/displayImpl';

export class StringDisplayImpl extends DisplayImpl {
  private string: string;
  private width: number;
  public constructor(string: string) {
    super();
    this.string = string;
    this.width = string.length;
  }
  public rawOpen(): string {
    return this.printLine();
  }
  public rawPrint(): string {
    return `|${this.string}|`;
  }
  public rawClose(): string {
    return this.printLine();
  }
  private printLine(): string {
    const string: string[] = [];
    string.push('+');
    for (let i = 0; i < this.width; i++) {
      string.push('-');
    }
    string.push('+');

    return string.join('');
  }
}
```

渡された文字列の長さに応じて枠の上辺と下辺を作る`rawOpen`と`rawClose`、渡された文字列の左右にパイプをつけた文字列を作る`rawPrint`を実装している。

### 機能のクラス

実装のクラス階層のインターフェースを使って、機能を提供するクラス。

display.ts

```typescript
import { DisplayImpl } from 'bridge/implementation/displayImpl';

export class Display {
  private impl: DisplayImpl;
  public constructor(impl: DisplayImpl) {
    this.impl = impl;
  }
  public open(): string {
    return this.impl.rawOpen();
  }
  public print(): string {
    return this.impl.rawPrint();
  }
  public close(): string {
    return this.impl.rawClose();
  }
  public display(): string {
    const string: string[] = [];
    string.push(this.open());
    string.push(this.print());
    string.push(this.close());
    return string.join('\n');
  }
}
```

`rawOpen`などの実装のクラスをそのまま使うだけの`open`などのメソッドと、それらを順番に使って枠付きの文字を作る`display`メソッドを用意している。

複数回表示する機能を用意する場合は以下のような機能のクラスを作る。

countDisplay

```typescript
import { Display } from 'bridge/function/display';
import { DisplayImpl } from 'bridge/implementation/displayImpl';

export class CountDisplay extends Display {
  public constructor(impl: DisplayImpl) {
    super(impl);
  }
  public multiDisplay(times: number): string {
    const string: string[] = [];
    string.push(this.open());
    for (let i = 0; i < times; i++) {
      string.push(this.print());
    }
    string.push(this.close());
    return string.join('\n');
  }
}
```

### 機能や実装を追加する

#### ランダム回数表示する機能

例えばランダム回数表示する機能を追加するときは、機能のクラス階層にクラスを追加する。

randomCountDisplay.ts

```typescript
```

## 感想・考察
