import Calendar from './Calendar';
import MonthState from '../State/MonthState';
import YearState from '../State/YearState';
import DecadeState from '../State/DecadeState';
import Publisher from '../Publisher/Publisher';

const timezone_mock = require('timezone-mock');
      timezone_mock.register('UTC');

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

  it('it should show the month grid based on minDate when selectedDate is undefined', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      minDate: new Date('2019-01-30')
    });
    expect(calendar.scope.getTime()).toEqual(new Date('2019-01-30').getTime());
  });

  it('it should parse dates (selectedDate, minDate, maxDate)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      minDate: '2019-01-25 00:00:00',
      maxDate: '2019-02-28 00:00:00',
      selectedDate: 1549756800000
    });

    expect(calendar.options.minDate.getTime()).toEqual(new Date('2019-01-25 00:00:00').getTime());
    expect(calendar.options.maxDate.getTime()).toEqual(new Date('2019-02-28 00:00:00').getTime());
    expect(calendar.options.selectedDate.getTime()).toEqual(new Date('2019-02-10 00:00:00').getTime());
  });
});

describe('Exceptions', () => {
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

  it('it should throw an error of the incorrect minDate option', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    expect(() => {
      const calendar = new Calendar('#root', {
        minDate: 'incorrect-date'
      });
    }).toThrow();
  });

  it('it should throw an error of the incorrect maxDate option', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    expect(() => {
      const calendar = new Calendar('#root', {
        maxDate: 'incorrect-date'
      });
    }).toThrow();
  });

  it('it should throw an error when minDate > maxDate', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    expect(() => {
      const calendar = new Calendar('#root', {
        minDate: new Date('2019-02-01'),
        maxDate: new Date('2019-01-01')
      });
    }).toThrow();
  });

  it('it should throw an error when selectedDate < minDate', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    expect(() => {
      const calendar = new Calendar('#root', {
        selectedDate: new Date('2019-01-01')
        minDate: new Date('2019-02-01'),
      });
    }).toThrow();
  });

  it('it should throw an error when selectedDate > maxDate', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    expect(() => {
      const calendar = new Calendar('#root', {
        selectedDate: new Date('2019-03-01')
        maxDate: new Date('2019-02-01'),
      });
    }).toThrow();
  });

  it('it should throw an error when selectedDate > maxDate', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    expect(() => {
      const calendar = new Calendar('#root', {
        selectedDate: new Date('2019-03-01')
        maxDate: new Date('2019-02-01'),
      });
    }).toThrow();
  });
})

describe('API', () => {
  it('it should change scope', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date
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

  it('it should NOT change scope (minDate & maxDate limiters)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
      minDate: new Date('2019-02-01'),
      maxDate: new Date('2019-03-31')
    });

    const oldScope = calendar.scope;

    calendar.changeScope(new Date('2019-01-01'));
    expect(calendar.scope.getTime()).toEqual(oldScope.getTime());

    calendar.changeScope(new Date('2019-04-01'));
    expect(calendar.scope.getTime()).toEqual(oldScope.getTime());

    calendar.changeScope(new Date('2019-02-05'));
    expect(calendar.scope.getTime()).toEqual(new Date('2019-02-05').getTime());
  });

  it('it should change state', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
      minDate: new Date('2019-02-03'),
      maxDate: new Date('2019-02-25')
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

  it('(MonthState.handleLeftClick) it should NOT change month to prev (minDate limiter)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
      minDate: new Date('2019-02-01')
    });

    const oldScope = calendar.scope;

    document.querySelector('.pc-pointer-left').click();
    expect(calendar.options.selectedDate && calendar.options.selectedDate.getTime()).toEqual(date.getTime());
    expect(calendar.scope.getTime()).toEqual(oldScope.getTime());
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

  it('(MonthState.handleRightClick) it should NOT change month to next (maxDate limiter)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
      maxDate: new Date('2019-02-25')
    });

    const oldScope = calendar.scope;

    document.querySelector('.pc-pointer-right').click()
    expect(calendar.scope.getTime()).toEqual(oldScope.getTime());
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

  it('(YearState.handleLeftClick) it should NOT change year to prev (minDate limiter)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
      minDate: new Date('2019-01-01')
    });

    const oldScope = calendar.scope;

    document.querySelector('.pc-title').click();
    document.querySelector('.pc-pointer-left').click();
    expect(calendar.scope.getTime()).toEqual(oldScope.getTime());
  });

  it('(YearState.handleRightClick) it should change year to next', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    document.querySelector('.pc-title').click();
    document.querySelector('.pc-pointer-right').click();
    expect(calendar.options.selectedDate && calendar.options.selectedDate.getTime()).toEqual(date.getTime());
    expect(calendar.scope.getTime()).toEqual(new Date('2020-01-01').getTime());
  });

  it('(YearState.handleRightClick) it should NOT change month to next (maxDate limiter)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
      maxDate: new Date('2019-02-25')
    });

    const oldScope = calendar.scope;

    document.querySelector('.pc-title').click();
    document.querySelector('.pc-pointer-right').click();
    expect(calendar.scope.getTime()).toEqual(oldScope.getTime());
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
    expect(calendar.scope.getTime()).toEqual(new Date('2019-03-01').getTime());
    expect(calendar.state instanceof MonthState).toBe(true);
  });

  it('(YearState.handleDateClick) it should NOT show the month grid based on selected month (minDate & maxDate limiters)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
      minDate: new Date('2019-02-01'),
      maxDate: new Date('2019-03-31')
    });

    const oldScope = calendar.scope;

    document.querySelector('.pc-title').click();
    document.querySelectorAll('button.pc-cell')[0].click();
    expect(calendar.scope.getTime()).toEqual(oldScope.getTime());
    expect(calendar.state instanceof MonthState).toBe(false);

    document.querySelectorAll('button.pc-cell')[3].click();
    expect(calendar.scope.getTime()).toEqual(oldScope.getTime());
    expect(calendar.state instanceof MonthState).toBe(false);

    document.querySelectorAll('button.pc-cell')[2].click();
    expect(calendar.scope.getTime()).toEqual(new Date('2019-03-01').getTime());
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

  it('(DecadeState.handleLeftClick) it should NOT change decade to prev (minDate limiter)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
      minDate: new Date('2019-01-01'),
      maxDate: new Date('2019-03-31')
    });

    const oldScope = calendar.scope;

    document.querySelector('.pc-title').click();
    document.querySelector('.pc-title').click();
    document.querySelector('.pc-pointer-left').click();
    expect(calendar.scope.getTime()).toEqual(oldScope.getTime());
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

  it('(DecadeState.handleRightClick) it should NOT change month to next (maxDate limiter)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: new Date('2003-02-01'),
      minDate: new Date('2003-01-01'),
      maxDate: new Date('2003-03-31')
    });

    const oldScope = calendar.scope;

    document.querySelector('.pc-title').click();
    document.querySelector('.pc-title').click();
    document.querySelector('.pc-pointer-right').click();
    expect(calendar.scope.getTime()).toEqual(oldScope.getTime());
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
    expect(calendar.scope.getTime()).toEqual(new Date('2010-01-01').getTime());
    expect(calendar.state instanceof YearState).toBe(true);
  });

  it('(DecadeState.handleCenterClick) it should NOT show the months grid based on selected year (minDate & maxDate limiters)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
      minDate: new Date('2019-01-01'),
      maxDate: new Date('2019-03-31')
    });

    const oldScope = calendar.scope;

    document.querySelector('.pc-title').click();
    document.querySelector('.pc-title').click();
    document.querySelectorAll('button.pc-cell')[0].click();
    expect(calendar.scope.getTime()).toEqual(oldScope.getTime());
    expect(calendar.state instanceof YearState).toBe(false);

    document.querySelectorAll('button.pc-cell')[8].click();
    expect(calendar.scope.getTime()).toEqual(oldScope.getTime());
    expect(calendar.state instanceof YearState).toBe(false);

    document.querySelectorAll('button.pc-cell')[9].click();
    expect(calendar.scope.getTime()).toEqual(new Date('2019-01-01').getTime());
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

    // MonthState
    calendar.prev();
    document.querySelector('.pc-pointer-left').click();
    expect(callback).toBeCalledTimes(2);

    // YearState
    document.querySelector('.pc-title').click();
    calendar.prev();
    document.querySelector('.pc-pointer-left').click();
    expect(callback).toBeCalledTimes(4);

    // DecadeState
    document.querySelector('.pc-title').click();
    calendar.prev();
    document.querySelector('.pc-pointer-left').click();
    expect(callback).toBeCalledTimes(6);
  });

  it('it should NOT listen the "prev" event (minDate limiter)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
      minDate: new Date('2019-02-01')
    });

    const callback = jest.fn();
    calendar.on('prev', callback);

    // MonthState
    calendar.prev();
    document.querySelector('.pc-pointer-left').click();
    expect(callback).toBeCalledTimes(0);

    // YearState
    document.querySelector('.pc-title').click();
    calendar.prev();
    document.querySelector('.pc-pointer-left').click();
    expect(callback).toBeCalledTimes(0);

    // DecadeState
    document.querySelector('.pc-title').click();
    calendar.prev();
    document.querySelector('.pc-pointer-left').click();
    expect(callback).toBeCalledTimes(0);
  });

  it('it should listen the "next" event', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
    });

    const callback = jest.fn();
    calendar.on('next', callback);

    // MonthState
    calendar.next();
    document.querySelector('.pc-pointer-right').click();
    expect(callback).toBeCalledTimes(2);

    // YearState
    document.querySelector('.pc-title').click();
    calendar.next();
    document.querySelector('.pc-pointer-right').click();
    expect(callback).toBeCalledTimes(4);

    // DecadeState
    document.querySelector('.pc-title').click();
    calendar.next();
    document.querySelector('.pc-pointer-right').click();
    expect(callback).toBeCalledTimes(6);
  });

  it('it should NOT listen the "next" event (maxDate limiter)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
      maxDate: new Date('2019-02-25')
    });

    const callback = jest.fn();
    calendar.on('next', callback);

    // MonthState
    calendar.next();
    document.querySelector('.pc-pointer-right').click();
    expect(callback).toBeCalledTimes(0);

    // YearState
    document.querySelector('.pc-title').click();
    calendar.next();
    document.querySelector('.pc-pointer-right').click();
    expect(callback).toBeCalledTimes(0);

    // DecadeState
    document.querySelector('.pc-title').click();
    calendar.next();
    document.querySelector('.pc-pointer-right').click();
    expect(callback).toBeCalledTimes(0);
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

  it('it should NOT listen the "state-changed" event (minDate & maxDate limiters)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
      minDate: new Date('2019-02-01 00:00:00'),
      maxDate: new Date('2019-03-01 23:59:59')
    });

    const callback = jest.fn(state => state);
    calendar.on('state-changed', callback);

    document.querySelector('.pc-title').click();
    document.querySelectorAll('button.pc-cell')[0].click();
    document.querySelectorAll('button.pc-cell')[3].click();
    document.querySelectorAll('button.pc-cell')[2].click();
    document.querySelector('.pc-title').click();
    document.querySelector('.pc-title').click();
    document.querySelectorAll('button.pc-cell')[2].click();
    document.querySelectorAll('button.pc-cell')[9].click();
    expect(callback).toBeCalledTimes(5);
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

  it('it should NOT listen the "date-changed" event (minDate & maxDate limiters)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
      minDate: new Date('2019-02-01'),
      maxDate: new Date('2019-02-25')
    });

    const callback = jest.fn(date => date);
    calendar.on('date-changed', callback);

    calendar.changeDate(new Date());
    document.querySelectorAll('button.pc-cell')[0].click();
    expect(callback).toBeCalledTimes(0);
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

  it('it should NOT listen the "scope-changed" event (minDate & maxDate limiters)', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date,
      minDate: new Date('2019-02-01'),
      maxDate: new Date('2019-02-25')
    });

    const callback = jest.fn(date => date);
    calendar.on('scope-changed', callback);

    // MonthState
    calendar.changeScope(new Date('2019-01-01'));
    calendar.prev();
    calendar.next();
    document.querySelector('.pc-pointer-left').click();
    document.querySelector('.pc-pointer-right').click();

    // YearState
    calendar.changeState(new YearState(calendar));
    calendar.changeScope(new Date('2018-01-01'));
    calendar.prev();
    calendar.next();
    document.querySelector('.pc-pointer-left').click();
    document.querySelector('.pc-pointer-right').click();

    // DecadeState
    calendar.changeState(new DecadeState(calendar));
    calendar.changeScope(new Date('2018-01-01'));
    calendar.prev();
    calendar.next();
    document.querySelector('.pc-pointer-left').click();
    document.querySelector('.pc-pointer-right').click();

    expect(callback).toBeCalledTimes(0);
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
