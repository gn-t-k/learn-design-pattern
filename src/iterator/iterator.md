# Iteratorパターン

GoFのデザインパターンの学習のため、23のパターンをTypeScriptで実装して内容をまとめる。

## 概要

配列に含まれる要素を順に走査し、何かしらの処理をするための働きを一般化して再利用を促すパターンをIteratorパターンと呼ぶ。

## サンプルプログラム

結城浩先生の[増補改訂版Java言語で学ぶデザインパターン入門](https://www.amazon.co.jp/%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88Java%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E5%85%A5%E9%96%80-%E7%B5%90%E5%9F%8E-%E6%B5%A9/dp/4797327030)のJavaプログラムをTypeScriptで写経した。

### Iteratorパターンを表現するinterface

iterator.ts

```typescript
export interface Iterator {
  hasNext: () => boolean;
  next: () => unknown;
}
```

aggregate.ts

```typescript
import { Iterator } from 'iterator/iterator';

export interface Aggregate {
  iterator: () => Iterator;
}

```

Iteratorパターンを利用する「集合体」は、`implements Aggregate`となるようにする。`Aggregate`を実装するクラスは、Iteratorを作成する`iterator`メソッドを必ず実装しなければならない。`iterator`メソッドによって作成されるIteratorは、「次の要素」が存在するかどうかをチェックする`hasNext`メソッドと「次の要素」を取得するための`next`メソッドを持つ。

### Iteratorパターンを適用するクラス

本と本棚のクラスを用意し、Iteratorパターンを利用して本棚から本を取り出せるようにメソッドを実装する。

book.ts

```typescript
export class Book {
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}
```

bookShelf.ts

```typescript
import { Aggregate } from 'iterator/aggregate';
import { Book } from 'iterator/book';
import { Iterator } from 'iterator/iterator';
import { BookShelfIterator } from 'iterator/bookShelfIterator';

export class BookShelf implements Aggregate {
  private books: Book[];
  private last: number = 0;

  public constructor(maxsize: number) {
    this.books = Array(maxsize);
  }

  public getBookAt(index: number): Book {
    return this.books[index];
  }

  public appendBook(book: Book): void {
    this.books[this.last++] = book;
  }

  public getLength(): number {
    return this.last;
  }

  public iterator(): Iterator {
    return new BookShelfIterator(this);
  }
}
```

bookは`name`プロパティを持つ本インスタンスを作成でき、bookShelfは`book`の配列と配列の長さ（本の数）をプロパティに持つ本棚インスタンスを作成する。bookShelfの`appendBook`メソッドを使って、本棚に本を追加できる。また、本棚の中の本を操作するためのIteratorを作成するiteratorメソッドも用意してある。本棚のIteratorを作成するBookShelfIteratorクラスは以下。

bookShelfIterator.ts

```typescript
import { Iterator } from 'iterator/iterator';
import { BookShelf } from 'iterator/bookShelf';
import { Book } from 'iterator/book';

export class BookShelfIterator implements Iterator {
  private bookShelf: BookShelf;
  private index: number;

  public constructor(bookShelf: BookShelf) {
    this.bookShelf = bookShelf;
    this.index = 0;
  }

  public hasNext(): boolean {
    return this.index < this.bookShelf.getLength();
  }

  public next(): Book {
    const book: Book = this.bookShelf.getBookAt(this.index++);
    return book;
  }
}
```

`Iterator`interfaceの実装なので、`hasNext`メソッドと`next`メソッドを用意している。

動作確認のためのテストは以下のとおり。

```typescript
import { BookShelf } from 'iterator/bookShelf';
import { Book } from 'iterator/book';
import { Iterator } from 'iterator/iterator';

describe('Iterator pattern', () => {
  const bookShelf = new BookShelf(4);
  bookShelf.appendBook(new Book('Around the World in 80 Days'));
  bookShelf.appendBook(new Book('Bible'));
  bookShelf.appendBook(new Book('Cinderella'));
  bookShelf.appendBook(new Book('Daddy-Long-Legs'));

  test('iteratorによって本が取り出せる', () => {
    const it: Iterator = bookShelf.iterator();

    const books = [];
    while (it.hasNext()) {
      const book = it.next() as Book;
      books.push(book.getName());
    }

    const expected = [
      'Around the World in 80 Days',
      'Bible',
      'Cinderella',
      'Daddy-Long-Legs',
    ];
    expect(books).toEqual(expected);
  });
});

```

## 考察・感想

### 抽象クラスの意味・役割が理解できた

Aggregateを実装するクラスは必ずIteratorを返すメソッドを用意しなければいけない、IteratorはhasNextとnextを実装しなければいけない、を決めて置けるのは便利だと感じた。

### テストしにくいと思った

クラスのプロパティが「状態」になっており、テストで「状態」を再現しにくくてやりにくいと感じた。クラスのメソッドのテストってこれでやりかたあってるのだろうか。要調査。
