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
    if (this.index < this.bookShelf.getLength()) {
      return true;
    } else {
      return false;
    }
  }

  public next(): Book {
    const book: Book = this.bookShelf.getBookAt(this.index);
    this.index++;
    return book;
  }
}
