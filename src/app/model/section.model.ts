export class Section {
  private _id: undefined;
  private _label: undefined;
  private _position: undefined;

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

  get position(): undefined {
    return this._position;
  }

  set position(value: undefined) {
    this._position = value;
  }
}
