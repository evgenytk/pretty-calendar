import Calendar from './Calendar';
import MonthState from '../State/MonthState';
import YearState from '../State/YearState';
import DecadeState from '../State/DecadeState';
import Publisher from '../Publisher/Publisher';

describe('Publisher.ts', () => {
  const date = new Date('2019-02-05');
  const eventFire = (el: any, etype: any) => {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

  it('it should initialize without errors', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    expect(() => {
      const calendar = new Calendar('#root');
    }).not.toThrow();
  });

  it('it should throw error an of the not found root HTML node', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    expect(() => {
      const calendar = new Calendar('#unknown');
    }).toThrow();
  });

  it('it should initialize with MonthState', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root');
    expect(calendar.state instanceof MonthState).toBe(true);
  });

  it('it should initialize with Publisher', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root');
    expect(calendar.publisher instanceof Publisher).toBe(true);
  });

  // TODO testing for incorrect options

  it('it should initialize with date', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });
    expect(calendar.scope.getTime()).toEqual(date.getTime());
  });

  it('it should initialize with MonthState', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    expect(document.body).toMatchSnapshot()
  });

  it('it should change selectedDate by date click (MonthState)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });
    
    eventFire(document.querySelectorAll('[data-pc-timestamp]')[0], 'click');
    const { selectedDate } = calendar.options;
    expect(selectedDate && selectedDate.getTime() === new Date('2019-01-28').getTime()).toBe(true);
    expect(document.body).toMatchSnapshot();
  });

  it('it should change the scope to left by click (MonthState)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    eventFire(document.querySelector('.pc-pointer-left'), 'click');
    expect(document.body).toMatchSnapshot();
  });

  it('it should change the scope to right by click (MonthState)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    eventFire(document.querySelector('.pc-pointer-right'), 'click');
    expect(document.body).toMatchSnapshot();
  });

  it('it should update the state from MonthState to YearState by click', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    eventFire(document.querySelector('.pc-title'), 'click');
    expect(calendar.state instanceof YearState).toBe(true);
    expect(document.body).toMatchSnapshot();
  });

  it('it should update the state from YearState to DecadeState by click', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    eventFire(document.querySelector('.pc-title'), 'click');
    eventFire(document.querySelector('.pc-title'), 'click');
    expect(calendar.state instanceof DecadeState).toBe(true);
    expect(document.body).toMatchSnapshot();
  });
})