import Calendar from '../Calendar/Calendar';

abstract class Extension {

  protected calendar: Calendar;

  constructor(calendar: Calendar) {
    this.calendar = calendar;
  }

  public abstract render(): string;
}

export default Extension;