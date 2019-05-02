import { IIntl } from '@pretty-calendar/core';

export interface ICalendarOptions {
  selectedDate?: Date;
  intl?: IIntl;
  minDate?: Date;
  maxDate?: Date;
}
