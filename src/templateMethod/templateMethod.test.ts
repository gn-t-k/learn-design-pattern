import { CharDisplay } from 'templateMethod/charDisplay';
import { StringDisplay } from 'templateMethod/stringDisplay';

describe('templateMethod', () => {
  test('charDisplay', () => {
    const charDisplay = new CharDisplay('H');
    const actual = charDisplay.display();
    const expected = '<<HHHHH>>';

    expect(actual).toEqual(expected);
  });

  test('stringDisplay', () => {
    const stringDisplay = new StringDisplay('Hello, World');
    const actual = stringDisplay.display();
    const expected =
      '+------------+\n|Hello, World|\n|Hello, World|\n|Hello, World|\n|Hello, World|\n|Hello, World|\n+------------+\n';

    expect(actual).toEqual(expected);
  });
});
