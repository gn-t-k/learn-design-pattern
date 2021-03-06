import { CharDisplay } from 'templateMethod/charDisplay';
import { StringDisplay } from 'templateMethod/stringDisplay';
import { AbstractDisplay } from './abstractDisplay';

describe('templateMethod', () => {
  test('charDisplay', () => {
    const charDisplay: AbstractDisplay = new CharDisplay('H');
    const actual = charDisplay.display();
    const expected = '<<HHHHH>>';

    expect(actual).toEqual(expected);
  });

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
});
