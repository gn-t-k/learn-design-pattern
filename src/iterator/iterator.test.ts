import { BookShelf } from 'iterator/bookShelf';
import { Book } from 'iterator/book';
import { Iterator } from 'iterator/iterator';

describe('Iterator pattern', () => {
  test('aaa', () => {
    const bookShelf = new BookShelf(4);
    bookShelf.appendBook(new Book('Around the World in 80 Days'));
    bookShelf.appendBook(new Book('Bible'));
    bookShelf.appendBook(new Book('Cinderella'));
    bookShelf.appendBook(new Book('Daddy-Long-Legs'));
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
