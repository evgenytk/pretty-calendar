import Calendar from './Calendar';
import MonthState from '../State/MonthState';
import YearState from '../State/YearState';
import DecadeState from '../State/DecadeState';
import Publisher from '../Publisher/Publisher';

const date = new Date('2019-02-05');
const eventFire = (el: any, etype: any) => {
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
};

describe('Initialization', () => {
  it('it should initialize without errors', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    expect(() => {
      const calendar = new Calendar('#root');
    }).not.toThrow();

    expect(() => {
      const calendar = new Calendar(document.querySelector('#root'));
    }).not.toThrow();
  });

  it('it should throw an error of the not found root HTML node', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    expect(() => {
      const calendar = new Calendar('#unknown');
    }).toThrow();
  });

  it('it should throw an error of the incorrect root HTML node type', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    expect(() => {
      const calendar = new Calendar(123);
    }).toThrow();
  });

  it('it should throw an error of the incorrect selectedDate option', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    expect(() => {
      const calendar = new Calendar('#root', {
        selectedDate: 'incorrect-date'
      });
    }).toThrow();
  });

  it('it should initialize with Publisher', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root');
    expect(calendar.publisher instanceof Publisher).toBe(true);
  });

  it('it should initialize with selected date', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });
    expect(calendar.options.selectedDate && calendar.options.selectedDate.getTime()).toEqual(date.getTime());
    expect(calendar.scope.getTime()).toEqual(date.getTime());
  });
});

describe('API', () => {
  it('it should change scope', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    calendar.changeScope(new Date('2019-01-01'));
    expect(calendar.scope.getTime()).toEqual(new Date('2019-01-01').getTime());
    expect(document.body).toMatchSnapshot();

    calendar.changeScope(new Date('2019-05-01'));
    expect(calendar.scope.getTime()).toEqual(new Date('2019-05-01').getTime());
    expect(document.body).toMatchSnapshot();

    calendar.changeScope(new Date('2020-12-31'));
    expect(calendar.scope.getTime()).toEqual(new Date('2020-12-31').getTime());
    expect(document.body).toMatchSnapshot();
  });

  it('it should change state', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    expect(calendar.state instanceof MonthState).toBe(true);
    expect(document.body).toMatchSnapshot();

    calendar.changeState(new YearState(calendar));
    expect(calendar.state instanceof YearState).toBe(true);
    expect(document.body).toMatchSnapshot();

    calendar.changeState(new DecadeState(calendar));
    expect(calendar.state instanceof DecadeState).toBe(true);
    expect(document.body).toMatchSnapshot();

    calendar.changeState(new MonthState(calendar));
    expect(calendar.state instanceof MonthState).toBe(true);
    expect(document.body).toMatchSnapshot();
  });

  it('it should parse state', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root');
    calendar.changeState('YearState');

    expect(calendar.state instanceof YearState).toBe(true);
  });

  it('it should show/hide', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root');
    const root = document.querySelector('#root') as HTMLElement;

    calendar.hide();
    expect(root.style.display).toEqual('none');
    calendar.show();
    expect(root.style.display).toEqual('block');
  });

  it('it should throw an error of the incorrect state name', () => {
    document.body.innerHTML = `<div id="root"></div>`;

    expect(() => {
      const calendar = new Calendar('#root');
      calendar.changeState('UnknownState');
    }).toThrow();
  });
});

describe('Mouse clicks', () => {
  it('(MonthState.handleLeftClick) it should change month to prev', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    document.querySelector('.pc-pointer-left').click();
    expect(calendar.options.selectedDate && calendar.options.selectedDate.getTime()).toEqual(date.getTime());
    expect(calendar.scope.getTime()).toEqual(new Date('2019-01-01').getTime());
  });

  it('(MonthState.handleRightClick) it should change month to next', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    document.querySelector('.pc-pointer-right').click()
    expect(calendar.options.selectedDate && calendar.options.selectedDate.getTime()).toEqual(date.getTime());
    expect(calendar.scope.getTime()).toEqual(new Date('2019-03-01').getTime());
  });

  it('(MonthState.handleCenterClick) it should show the years grid', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    document.querySelector('.pc-title').click();
    expect(calendar.options.selectedDate && calendar.options.selectedDate.getTime()).toEqual(date.getTime());
    expect(calendar.scope.getTime()).toEqual(date.getTime());
    expect(calendar.state instanceof YearState).toBe(true);
  });

  it('(MonthState.handleDateClick) it should change selected date', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    document.querySelectorAll('button.pc-cell')[0].click()
    expect(calendar.options.selectedDate && calendar.options.selectedDate.getTime()).toEqual(
      new Date('2019-01-28 00:00:00').getTime(),
    );
    expect(calendar.scope.getTime()).toEqual(new Date('2019-01-28 00:00:00').getTime());
  });

  it('(YearState.handleLeftClick) it should change year to prev', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    document.querySelector('.pc-title').click();
    document.querySelector('.pc-pointer-left').click();
    expect(calendar.options.selectedDate && calendar.options.selectedDate.getTime()).toEqual(date.getTime());
    expect(calendar.scope.getTime()).toEqual(new Date('2018-01-01').getTime());
  });

  it('(YearState.handleRightClick) it should change month to next', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    document.querySelector('.pc-title').click();
    document.querySelector('.pc-pointer-right').click();
    expect(calendar.options.selectedDate && calendar.options.selectedDate.getTime()).toEqual(date.getTime());
    expect(calendar.scope.getTime()).toEqual(new Date('2020-01-01').getTime());
  });

  it('(YearState.handleCenterClick) it should show the decade grid', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    document.querySelector('.pc-title').click();
    document.querySelector('.pc-title').click();
    expect(calendar.options.selectedDate && calendar.options.selectedDate.getTime()).toEqual(date.getTime());
    expect(calendar.scope.getTime()).toEqual(date.getTime());
    expect(calendar.state instanceof DecadeState).toBe(true);
  });

  it('(YearState.handleDateClick) it should show the month grid based on selected month', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    document.querySelector('.pc-title').click();
    document.querySelectorAll('button.pc-cell')[2].click();
    expect(calendar.options.selectedDate && calendar.options.selectedDate.getTime()).toEqual(date.getTime());
    expect(calendar.scope.getTime() + 10800 * 1000).toEqual(new Date('2019-03-01').getTime());
    expect(calendar.state instanceof MonthState).toBe(true);
  });

  it('(DecadeState.handleLeftClick) it should change decade to prev', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    document.querySelector('.pc-title').click();
    document.querySelector('.pc-title').click();
    document.querySelector('.pc-pointer-left').click();
    expect(calendar.options.selectedDate && calendar.options.selectedDate.getTime()).toEqual(date.getTime());
    expect(calendar.scope.getTime()).toEqual(new Date('2000-01-01').getTime());
  });

  it('(DecadeState.handleRightClick) it should change month to next', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    document.querySelector('.pc-title').click();
    document.querySelector('.pc-title').click();
    document.querySelector('.pc-pointer-right').click();
    expect(calendar.options.selectedDate && calendar.options.selectedDate.getTime()).toEqual(date.getTime());
    expect(calendar.scope.getTime()).toEqual(new Date('2020-01-01').getTime());
  });

  it('(DecadeState.handleCenterClick) it should show the months grid based on selected year', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    document.querySelector('.pc-title').click();
    document.querySelector('.pc-title').click();
    document.querySelectorAll('button.pc-cell')[0].click();
    expect(calendar.options.selectedDate && calendar.options.selectedDate.getTime()).toEqual(date.getTime());
    expect(calendar.scope.getTime() + 10800 * 1000).toEqual(new Date('2010-01-01').getTime());
    expect(calendar.state instanceof YearState).toBe(true);
  });
});

describe('Events', () => {
  it('it should listen the "prev" event', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    const callback = jest.fn();
    calendar.on('prev', callback);

    calendar.prev();
    document.querySelector('.pc-pointer-left').click();
    expect(callback).toBeCalledTimes(2);
  });

  it('it should listen the "next" event', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    const callback = jest.fn();
    calendar.on('next', callback);

    calendar.next();
    document.querySelector('.pc-pointer-right').click();
    expect(callback).toBeCalledTimes(2);
  });

  it('it should listen the "state-changed" event', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    const callback = jest.fn(state => state);
    calendar.on('state-changed', callback);

    document.querySelector('.pc-title').click();
    document.querySelector('.pc-title').click();
    document.querySelectorAll('button.pc-cell')[0].click();
    document.querySelectorAll('button.pc-cell')[0].click();
    calendar.changeState('YearState');
    calendar.changeState('DecadeState');
    calendar.changeState('YearState');
    calendar.changeState('MonthState');

    expect(callback).toBeCalledTimes(8);
    expect(callback.mock.results[0].value).toBe('YearState');
    expect(callback.mock.results[1].value).toBe('DecadeState');
    expect(callback.mock.results[2].value).toBe('YearState');
    expect(callback.mock.results[3].value).toBe('MonthState');
    expect(callback.mock.results[4].value).toBe('YearState');
    expect(callback.mock.results[5].value).toBe('DecadeState');
    expect(callback.mock.results[6].value).toBe('YearState');
    expect(callback.mock.results[7].value).toBe('MonthState');
  });

  it('it should listen the "date-changed" event', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    const callback = jest.fn(date => date);
    calendar.on('date-changed', callback);

    calendar.changeDate(new Date());
    document.querySelectorAll('button.pc-cell')[0].click();
    expect(callback).toBeCalledTimes(2);
  });

  it('it should listen the "scope-changed" event', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    const callback = jest.fn(date => date);
    calendar.on('scope-changed', callback);

    calendar.changeScope(new Date('2019-01-01'));
    calendar.prev();
    calendar.prev();
    document.querySelector('.pc-pointer-left').click();
    document.querySelector('.pc-pointer-right').click();
    expect(callback).toBeCalledTimes(5);
  });

  it('it should listen the "hide" event', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root');

    const callback = jest.fn(date => date);
    calendar.on('hide', callback);

    calendar.hide();
    calendar.hide();
    calendar.hide();
    
    expect(callback).toBeCalledTimes(1);
  });

  it('it should listen the "show" event', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root');

    const callback = jest.fn(date => date);
    calendar.on('show', callback);

    calendar.show();
    calendar.show();
    calendar.show();
    
    expect(callback).toBeCalledTimes(1);
  });

  it('it should unsubscribe', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    const callback = jest.fn();
    calendar.on('prev', callback);
    calendar.prev();
    calendar.unsubscribe('prev', callback);
    calendar.prev();
    expect(callback).toBeCalledTimes(1);
  });
});
