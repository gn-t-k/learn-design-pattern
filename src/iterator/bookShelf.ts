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
    this.books[this.last] = book;
    this.last++;
  }

  public getLength(): number {
    return this.last;
  }

  public iterator(): Iterator {
    return new BookShelfIterator(this);
  }
}
