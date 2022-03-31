import {Card} from "./card.model";

export class Section {
  private _id: undefined;
  private _label: undefined;
  private _position: any;
  private _cards: Card[] = [];

  constructor(obj: any) {
    Object.assign(this, obj);
  }

  get id(): undefined {
    return this._id;
  }

  set id(value: undefined) {
    this._id = value;
  }

  get label(): undefined {
    return this._label;
  }

  set label(value: undefined) {
    this._label = value;
  }

  get position(): any {
    return this._position;
  }

  set position(value: any) {
    this._position = value;
  }

  get cards(): Card[] {
    return this._cards;
  }

  set cards(value: Card[]) {
    value?.forEach((item) => {
      this._cards.push(new Card(item))
    });
  }
}
