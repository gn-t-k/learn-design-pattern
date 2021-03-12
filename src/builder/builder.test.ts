import { Director } from 'builder/director';
import { TextBuilder } from 'builder/textBuilder';
import { HTMLBuilder } from 'builder/htmlBuilder';

describe('Builder', () => {
  test('textBuilder', () => {
    const textBuilder = new TextBuilder();
    const director = new Director(textBuilder);
    director.construct();
    const result = textBuilder.getResult();

    expect(result).toEqual(
      '====================\n「Greeting」\n■朝から昼にかけて\n・おはようございます。\n・こんにちは。\n■夜に\n・こんばんは。\n・おやすみなさい。\n・さようなら。\n====================\n',
    );
  });

  test('htmlBuilder', () => {
    const htmlBuilder = new HTMLBuilder();
    const director = new Director(htmlBuilder);
    director.construct();
    const result = htmlBuilder.getResult();

    expect(result).toEqual(
      '<html><head><title>Greeting</title></head><body><h1>Greeting</h1><p>朝から昼にかけて</p><ul><li>おはようございます。<li/><li>こんにちは。<li/></ul><p>夜に</p><ul><li>こんばんは。<li/><li>おやすみなさい。<li/><li>さようなら。<li/></ul></body></html>',
    );
  });
});
