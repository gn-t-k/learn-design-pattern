import { Factory } from 'abstractFactory/factory/factory';
import { Link } from 'abstractFactory/factory/link';
import { ListLink } from 'abstractFactory/listFactory/listLink';

export class ListFactory extends Factory {
  public createLink(caption: string, url: string): Link {
    return new ListLink(caption, url);
  }
}
