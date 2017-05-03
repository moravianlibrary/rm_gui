import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.css']
})
export class DatetimePickerComponent implements OnInit {

  @Output() emitDate = new EventEmitter<Date>();

  @Input() description = '';

  @Input() initDate;

  refDate: Date;

  isTimeChooser = false;

  isHourSelection = true;
  isMinuteSelection = false;

  weekday: string[] = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',

];


  pickedDate: Date;

  constructor() { }

  nextYear(offset: number) {
    this.refDate = new Date(this.refDate.getFullYear() + offset, this.refDate.getMonth(), 1);
  }

  nextMonth(offset: number) {
    this.refDate = new Date(this.refDate.getFullYear() , this.refDate.getMonth() + offset, 1);
  }

  getDaysOfMonth(): any[] {
    const calendarMatrix: any[] = [];
    const lastDay = new Date(this.refDate.getFullYear(), this.refDate.getMonth() + 1, 0);
    let dayIndex = 1;

    let i = 0;
    while (dayIndex <= lastDay.getDate()) {
      calendarMatrix.push(new Array(7));
      for (let j = 0; j < this.weekday.length && dayIndex <= lastDay.getDate(); ++j) {
        const day = new Date(this.refDate.getFullYear(),
          this.refDate.getMonth(), dayIndex).getDay() - 1 < 0 ? this.weekday.length - 1 : new Date(this.refDate.getFullYear(),
            this.refDate.getMonth(), dayIndex).getDay() - 1;

        if (day === j) {
          const aux = this.pickedDate == null ? null : new Date(this.pickedDate.getFullYear(),
            this.pickedDate.getMonth(), this.pickedDate.getDate());
          const now = new Date(this.refDate.getFullYear(), this.refDate.getMonth(), dayIndex);
          let selected = false;
          if (aux != null) {
            selected = now.getTime() === aux.getTime();
          }
          calendarMatrix[i][j] = {day: now, isSelected: selected};
          dayIndex = dayIndex + 1;
        }
      }
      ++i;
    }

    return calendarMatrix;
  }

  selectDate(date: Date) {
    this.pickedDate = date == null ? null : date;
    this.emitDate.emit(this.pickedDate);
  }

  nextHour(offset: number) {
    this.pickedDate = new Date(this.pickedDate.getFullYear(),
      this.pickedDate.getMonth(),
      this.pickedDate.getDate(),
      this.pickedDate.getHours() + offset,
      this.pickedDate.getMinutes());
    this.refDate = this.pickedDate;

  }
  nextMinute(offset: number) {
    this.pickedDate = new Date(this.pickedDate.getFullYear(),
      this.pickedDate.getMonth(),
      this.pickedDate.getDate(),
      this.pickedDate.getHours(),
      this.pickedDate.getMinutes() + offset);
    this.refDate = this.pickedDate;
  }

  ngOnInit() {
    this.refDate = new Date();
    this.pickedDate = this.initDate;
  }

  today(){
    const today = new Date(Date.now());
    this.selectDate(today);
    this.refDate = this.pickedDate;
  }


  getTimeMatrix(): any {
    const timeMatrix = [];
    const step = this.isMinuteSelection ? 5 : 1;
    const periodOfTime = this.isMinuteSelection ? 60 : 24;


    let currentTime = 0;

    // 4 because of max length of the rows is 4
    for (let row = 0; row < periodOfTime / (4 * step); ++row) {
      timeMatrix.push(new Array(4));
        for (let col = 0; col <  4; ++col) {
          const aux = new Date(this.pickedDate);
          if (this.isMinuteSelection) {
            timeMatrix[row][col] = new Date(aux.setMinutes(currentTime));
          }else {
            timeMatrix[row][col] = new Date(aux.setHours(currentTime));
          }

          currentTime += step;
        }
    }

    return timeMatrix;
  }


  setHourSelection() {
    if (this.isTimeChooser  && this.isHourSelection){
      this.isTimeChooser = false;
    }else {
      this.isTimeChooser = true;
    }
    this.isHourSelection = true;
    this.isMinuteSelection = false;
  }

  setMinuteSelection() {
    if (this.isTimeChooser && this.isMinuteSelection){
      this.isTimeChooser = false;
    }else {
      this.isTimeChooser = true;
    }
    this.isHourSelection = false;
    this.isMinuteSelection = true;
  }


}
