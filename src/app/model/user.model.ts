import {Address} from "./address.model";

export class User {
  private _id: any;
  private _firstName: any;
  private _lastName: any;
  private _address!: Address;

  constructor(obj: any) {
    Object.assign(this, obj);
  }

  get id(): any {
    return this._id;
  }

  set id(value: any) {
    this._id = value;
  }

  get firstName(): any {
    return this._firstName;
  }

  set firstName(value: any) {
    this._firstName = value;
  }

  get lastName(): any {
    return this._lastName;
  }

  set lastName(value: any) {
    this._lastName = value;
  }

  get address(): Address {
    return this._address;
  }

  set address(value: any) {
    if (value != null) {
      this._address = new Address(value);
    }
  }
}
