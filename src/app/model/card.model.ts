import { User } from "./user.model";
import { Address } from "./address.model";
import { Tag } from "./tag.model";

export class Card {
  private _id: any;
  private _label: any;
  private _endDate: any;
  private _user!: User;
  private _estimatedTime: any;
  private _address!: Address;
  private _url: any;
  private _note!: any;
  private _tags: Tag[] = [];

  constructor(obj: any) {
    Object.assign(this, obj);
  }

  get id(): any {
    return this._id;
  }

  set id(value: any) {
    this._id = value;
  }

  get label(): any {
    return this._label;
  }

  set label(value: any) {
    this._label = value;
  }

  get endDate(): any {
    return this._endDate;
  }

  set endDate(value: any) {
    this._endDate = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: any) {
    this._user = value;
  }

  get estimatedTime(): any {
    return this._estimatedTime;
  }

  set estimatedTime(value: any) {
    this._estimatedTime = value;
  }

  get address(): Address {
    return this._address;
  }

  set address(value: any) {
    this._address = value;
  }

  get url(): any {
    return this._url;
  }

  set url(value: any) {
    this._url = value;
  }

  get note(): any {
    return this._note;
  }

  set note(value: any) {
    this._note = value;
  }

  get tags(): Tag[] {
    return this._tags;
  }

  set tags(value: Tag[]) {
    value?.forEach((item) => {
      this._tags.push(new Tag(item))
    });
  }
}
