import { Iterator } from 'iterator/iterator';

export interface Aggregate {
  iterator: () => Iterator;
}
