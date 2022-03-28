import {Section} from "./section.model";

export class Board {
  private _id: undefined;
  private _label: undefined;
  private _sections: Section[] = [];

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

  get sections(): Section[] {
    return this._sections;
  }

  set sections(value: Section[]) {
    value?.forEach((item) => {
      this._sections.push(new Section(item))
    });
  }
}
