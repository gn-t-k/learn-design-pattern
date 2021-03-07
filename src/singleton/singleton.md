# Singletonパターン

## 概要

システムの中に1つしか存在しないことが保証されたインスタンスを生成するためのパターン。

## サンプルコード

結城浩先生の[増補改訂版Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9/dp/4797327030)のJavaプログラムをTypeScriptで写経した。

Singletonパターンで登場するクラスは、1つだけ。

singleton.ts

```typescript
export class Singleton {
  private static singleton: Singleton = new Singleton();
  private constructor() {
    console.log('Generate a singleton instance');
  }
  public static getInstance(): Singleton {
    return this.singleton;
  }
}
```

コンストラクタがprivateになっていて、Singletonクラス外からコンストラクタを呼び出す事ができないようになっている。唯一のインスタンスは、Singletonクラス内で定義されているstaticなプロパティ`singleton`のみ。オブジェクトの要素は基本的にnewして作られるインスタンスごとにデータを保持するが、staticをつけたプロパティは、インスタンスではなくてクラスにデータを保持する。

Singletonの使い方は以下の通り。

singleton.test.ts

```typescript
import { Singleton } from 'singleton/singleton';

describe('singleton', () => {
  const obj1: Singleton = Singleton.getInstance();
  const obj2: Singleton = Singleton.getInstance();

  test('singletonから同じインスタンスが作られる', () => {
    expect(obj1 === obj2).toBe(true);
  });
});
```

Singletonを利用するときは、`getInstance`でstaticなプロパティ`singleton`を取得する。テストで表現している通り、`getInstance`によって作られたインスタンスは、同一のものになる。

実際、インスタンスを生成した時に表示されるメッセージも、テスト実行時は1回しか表示されていない。

```shell
$ yarn test
yarn run v1.22.10
〜〜省略〜〜
 PASS  src/singleton/singleton.test.ts
  ● Console

    console.log
      Generate a singleton instance

      at new Singleton (src/singleton/singleton.ts:4:13)
〜〜省略〜〜
-------------------------|---------|----------|---------|---------|-------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------|---------|----------|---------|---------|-------------------
All files                |     100 |      100 |     100 |     100 |
〜〜省略〜〜
 singleton               |     100 |      100 |     100 |     100 |
  singleton.ts           |     100 |      100 |     100 |     100 |
〜〜省略〜〜
-------------------------|---------|----------|---------|---------|-------------------
〜〜省略〜〜
```

## 考察・感想

newしないならいつインスタンス生成されてるんだ…？と思ったが、結城先生の本曰く、getInstanceを呼び出したタイミングらしい。

この例だと何も持ってないSingletonを作ったが、実際Singleton使うときはプロパティやメソッドは全部staticにするかんじなのだろうか。
