# Factory Methodパターン

## 概要

Template Methodをインスタンスの生成の場面に適用したものを、Factory Methodパターンと呼ぶ。スーパークラスでインスタンス生成の大枠を決め、サブクラスで実際のインスタンス生成を実装する。

## サンプルプログラム

結城浩先生の[増補改訂版Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9/dp/4797327030)のJavaプログラムをTypeScriptで写経した。

工場（factory）を用意し、`factory.create`で製品（IDCard）のインスタンスを生成するプログラム。cardは`card.use`メソッドを持つ。
使用イメージは以下の通り。

```typescript
import { Factory } from 'factoryMethod/framework/factory';
import { Product } from 'factoryMethod/framework/product';
import { IDCardFactory } from 'factoryMethod/idcard/IDCardFactory';

describe('Factory Method', () => {
  const factory: Factory = new IDCardFactory();
  const card: Product = factory.create('結城浩');

  test('use', () => {
    expect(card.use()).toEqual('結城浩のカードを使います');
  });

  test('owners', () => {
    const owners = (factory as IDCardFactory).getOwners();
    expect(owners).toEqual(['結城浩']);
  });
});
```

製品の抽象クラスとしてproduct、製品のインスタンスを作成する工場の抽象クラスとしてfactoryを、それぞれframeworkとして実装する。

### framework

product.ts

```typescript
export abstract class Product {
  public abstract use(): string;
}
```

productは、とりあえず`use`を持つことだけを決めておく。useで何をするかはサブクラスによる実装次第。

factory.ts

```typescript
import { Product } from 'factoryMethod/framework/product';

export abstract class Factory {
  public create(owner: string): Product {
    const p: Product = this.createProduct(owner);
    this.registerProduct(p);
    return p;
  }

  protected abstract createProduct(owner: string): Product;
  protected abstract registerProduct(product: Product): void;
}
```

factoryは、`create`によってProductのインスタンスを生成・登録・返却する処理をすることを決めておく。生成・登録の具体的な処理はサブクラスによる実装次第。

### IDCard

productの実装として、IDCardを実装する。

IDCard.ts

```typescript
import { Product } from 'factoryMethod/framework/product';

export class IDCard extends Product {
  private owner: string;

  constructor(owner: string) {
    super();
    console.log(`${owner}のカードを作ります`);
    this.owner = owner;
  }

  public use(): string {
    return `${this.owner}のカードを使います`;
  }
  public getOwner(): string {
    return this.owner;
  }
}
```

IDCardはowner（誰のカードか）の情報を持ち、`use`でそのカードの持ち主がわかる文字列を返すようにした。

IDCardFactory.ts

```typescript
import { Factory } from 'factoryMethod/framework/factory';
import { Product } from 'factoryMethod/framework/product';
import { IDCard } from 'factoryMethod/idcard/IDCard';

export class IDCardFactory extends Factory {
  private owners: string[] = [];
  protected createProduct(owner: string): Product {
    return new IDCard(owner);
  }
  protected registerProduct(product: Product): void {
    this.owners.push((product as IDCard).getOwner());
  }
  public getOwners(): string[] {
    return this.owners;
  }
}
```

IDCardのインスタンスを生成するIDCardFactory。生成したIDCardの持ち主の情報を持つ配列`owners`を持つ。`create`（抽象クラスfactoryに定義してある）したときにIDCardのインスタンスを生成、`owners`の配列にpushすることで登録する処理を行う。

## 考察・感想

getOwnersをテストするためにfactoryを型アサーション使って`IDCardFactory`にした。`Factory`のままだと`getOwners`が実装されてなくて使えないので。

あと、Javaだとpackageというのがあるから、package外からnewできないみたいなのができるっぽいけど、TypeScriptだとそういうスコープはないのだろうか。
