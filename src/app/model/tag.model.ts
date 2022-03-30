export class Tag {
  private _id: any;
  private _label: any;

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
}
