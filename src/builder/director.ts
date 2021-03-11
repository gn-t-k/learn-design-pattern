import { Builder } from 'builder/builder';

export class Director {
  private builder: Builder;
  public constructor(builder: Builder) {
    this.builder = builder;
  }
  public construct(): void {
    this.builder.makeTitle('Greeting');
    this.builder.makeString('朝から昼にかけて');
    this.builder.makeItems(['おはようございます。', 'こんにちは。']);
    this.builder.makeString('夜に');
    this.builder.makeItems([
      'こんばんは。',
      'おやすみなさい。',
      'さようなら。',
    ]);
    this.builder.close();
  }
}
