import Calendar from '../Calendar/Calendar';
import { Mask } from '@pretty-calendar/core';
import Extenstion from './Extenstion';

class DateInputExtension  {

  private calendar: Calendar;

  private id: string;

  private mask: Mask;

  constructor(calendar: Calendar) {
    this.calendar = calendar;
    this.id = 'pc-date-input';
    this.mask = new Mask('__.__.____');
  }

  public handleFocus = (event: any): void => {
    const el = <HTMLInputElement>event.target;

    if(el.id === this.id) {
      const pos = this.mask.getCaretPosition(this.mask.unmask(el.value));
      setTimeout(() => {
        el.setSelectionRange(pos, pos);
      }, 0);
    }
  }

  public handleInput = (event: any): void => {
    const el = <HTMLInputElement>event.target;

    if(el.id === this.id) {
      const unmasked = this.mask.unmask(el.value);
      const oldPos = this.mask.getCaretPosition(unmasked.slice(0, -1));
      const newPos = this.mask.getCaretPosition(unmasked);

      if(event.inputType === 'deleteContentBackward' && newPos - oldPos > 1) {
        el.value = this.mask.mask(unmasked);
        el.setSelectionRange(oldPos + 1, oldPos + 1);
      } else {
        el.value = this.mask.mask(unmasked);
        el.setSelectionRange(newPos, newPos);
      }

      const dates = {
        year: parseInt(el.value.split('.')[2]),
        month: parseInt(el.value.split('.')[1]),
        date: parseInt(el.value.split('.')[0])
      };
      
      if(unmasked.length === 8) {
        const date = new Date(dates.year, dates.month - 1, dates.date)
        if(dates.date >= 1 && dates.date <= 31 && dates.month >= 1 && dates.month <= 12 && !isNaN(date.getTime())) {
          this.calendar.api.changeDate(date);
          this.calendar.api.changeScope(date);
        } else {
          this.calendar.updateState(this.calendar.state);
        }
      }
    }
  }

  private formatDate = (): string => {
    const d: Date = this.calendar.options.selectedDate || new Date

    return `${('0' + d.getDate()).slice(-2)}.${('0' + (d.getMonth() + 1)).slice(-2)}.${d.getFullYear()}`;
  }

  public render(): string {
    return `
      <label class="pc-form-group">
        Date
        <input type="text" class="pc-input" id="${this.id}" value="${this.mask.reapply(this.formatDate())}">
      </label>
    `;
  }
}

export default DateInputExtension;