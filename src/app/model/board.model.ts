import {Section} from "./section.model";

export class Board {
  private _id: any;
  private _label: any;
  private _sections: Section[] = [];

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

  get sections(): Section[] {
    return this._sections;
  }

  set sections(value: Section[]) {
    value?.forEach((item) => {
      this._sections.push(new Section(item))
    });
  }
}
