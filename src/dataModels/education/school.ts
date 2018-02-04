import { Location } from './location';

export class School {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public address: string,
    public trends: string[],
    public location: Location
  ) { }
}