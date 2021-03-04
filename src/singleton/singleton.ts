export class Singleton {
  private static singleton: Singleton = new Singleton();
  private constructor() {
    console.log('Generate a singleton instance');
  }
  public static getInstance(): Singleton {
    return this.singleton;
  }
}
