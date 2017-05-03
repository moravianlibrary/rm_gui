import {Style} from './style';
export class Field {

  private _name: string;
  private _style: Style;
  get style(): Style {
    return this._style;
  }

  set style(value: Style) {
    this._style = value;
  }
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  constructor(obj?: any) {
    this._name        = obj && obj._name    ||  'id';
    this._style       = obj && obj._style   ||  null;
  }


}
