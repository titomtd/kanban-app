export class Address {
  private _id: undefined;
  private _street: undefined;
  private _zipCode: undefined;
  private _city: undefined;

  constructor(obj: any) {
    Object.assign(this, obj);
  }

  get id(): undefined {
    return this._id;
  }

  set id(value: undefined) {
    this._id = value;
  }

  get street(): undefined {
    return this._street;
  }

  set street(value: undefined) {
    this._street = value;
  }

  get zipCode(): undefined {
    return this._zipCode;
  }

  set zipCode(value: undefined) {
    this._zipCode = value;
  }

  get city(): undefined {
    return this._city;
  }

  set city(value: undefined) {
    this._city = value;
  }
}
