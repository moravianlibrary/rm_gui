import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {

  @Input() options: any[];

  @Input() placeholder: string;

  @Input() itemsAmount: number;

  @Input() isMultiple = true;

  @Input() multiSelectContent = 'Choose the following ...';

  @Output() onSelect = new EventEmitter<any[]>();

  initSelectContent: string;

  inputValue = '';

  selected: any[] = [];

  constructor() { }

  selectMe(item: any) {
    if (!this.amISelected(item)) {
      this.selected.push(item);
    } else {
      this.selected.splice(this.selected.indexOf(item), 1);
    }

    const singleSelected = [];

    if (!this.isMultiple) {
      this.selected.forEach(it => {
        if (item === it) {
          singleSelected.push(item);
        }
      });

      this.selected = singleSelected;

      if (singleSelected.length > 0) {
        this.multiSelectContent = singleSelected[0].value;
      } else {
        this.multiSelectContent = this.initSelectContent;
      }


    }else {
      if (this.selected.length === 0) {
        this.multiSelectContent = this.initSelectContent;
      }else {
        if (this.selected.length <= this.itemsAmount) {
          this.multiSelectContent = '';
          this.selected.forEach(sel => {
            this.multiSelectContent = sel.value + ' ' + this.multiSelectContent;
          });
        }else {
          this.multiSelectContent = 'Selected ' + this.selected.length + ' items';
        }
      }
    }

    this.onSelect.emit(this.selected);
  }



  amISelected(item: any): boolean {
    return this.selected.find(obj => obj.id === item.id && obj.value === item.value) != null;
  }
  ngOnInit() {
    this.initSelectContent = this.multiSelectContent;
  }

}
