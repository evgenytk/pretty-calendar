import Calendar from './Calendar';
import API from './API';
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
}

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

  it('it should initialize with MonthState', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root');
    expect(calendar.state instanceof MonthState).toBe(true);
  });

  it('it should initialize with API', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root');
    expect(calendar.api instanceof API).toBe(true);
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
})

describe('Mouse clicks', () => {
  it('(MonthState) it should change the scope to left', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    eventFire(document.querySelector('.pc-pointer-left'), 'click');
    const { selectedDate } = calendar.options;
    expect(selectedDate && selectedDate.getTime() === date.getTime());
    expect(calendar.scope.getTime() === new Date('2019-01-05').getTime());
    expect(document.body).toMatchSnapshot();
  });

  it('(MonthState) it should change the scope to right', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    eventFire(document.querySelector('.pc-pointer-right'), 'click');
    const { selectedDate } = calendar.options;
    expect(selectedDate && selectedDate.getTime() === date.getTime());
    expect(calendar.scope.getTime() === new Date('2019-03-05').getTime());
    expect(document.body).toMatchSnapshot();
  });

  it('(MonthState) it should update the state to YearState', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    eventFire(document.querySelector('.pc-title'), 'click');
    expect(calendar.state instanceof YearState).toBe(true);
    expect(document.body).toMatchSnapshot();
  });

  it('(MonthState) it should change selectedDate', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });
    
    eventFire(document.querySelectorAll('[data-pc-timestamp]')[0], 'click');
    const { selectedDate } = calendar.options;
    expect(selectedDate && selectedDate.getTime() === new Date('2019-01-28').getTime()).toBe(true);
    expect(document.body).toMatchSnapshot();
  });

  it('(YearState) it should change the scope to left', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    eventFire(document.querySelector('.pc-title'), 'click');
    eventFire(document.querySelector('.pc-pointer-left'), 'click');
    expect(calendar.scope.getTime() === new Date('2018-01-01').getTime()).toBe(true);
    expect(document.body).toMatchSnapshot();
  });

  it('(YearState) it should change the scope to right', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    eventFire(document.querySelector('.pc-title'), 'click');
    eventFire(document.querySelector('.pc-pointer-right'), 'click');
    expect(calendar.scope.getTime() === new Date('2020-01-01').getTime()).toBe(true);
    expect(document.body).toMatchSnapshot();
  });

  it('(YearState) it should update the state to DecadeState', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    eventFire(document.querySelector('.pc-title'), 'click');
    eventFire(document.querySelector('.pc-title'), 'click');
    expect(calendar.state instanceof DecadeState).toBe(true);
    expect(document.body).toMatchSnapshot();
  });

  it('(YearState) it should update the state to MonthState', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    eventFire(document.querySelector('.pc-title'), 'click');
    eventFire(document.querySelectorAll('[data-pc-timestamp]')[2], 'click');
    expect(calendar.state instanceof MonthState).toBe(true);
    expect(calendar.scope.getTime() === new Date('2019-03-01').getTime()).toBe(true);
    expect(document.body).toMatchSnapshot();
  });


  it('(DecadeState) it should change the scope to left', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    eventFire(document.querySelector('.pc-title'), 'click');
    eventFire(document.querySelector('.pc-title'), 'click');
    eventFire(document.querySelector('.pc-pointer-left'), 'click');
    expect(calendar.scope.getTime() === new Date('2000-01-01').getTime()).toBe(true);
    expect(document.body).toMatchSnapshot();
  });

  it('(DecadeState) it should change the scope to right', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    eventFire(document.querySelector('.pc-title'), 'click');
    eventFire(document.querySelector('.pc-title'), 'click');
    eventFire(document.querySelector('.pc-pointer-right'), 'click');
    expect(calendar.scope.getTime() === new Date('2020-01-01').getTime()).toBe(true);
    expect(document.body).toMatchSnapshot();
  });

  it('(DecadeState) it should update the state to YearState', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
        selectedDate: date
    });

    eventFire(document.querySelector('.pc-title'), 'click');
    eventFire(document.querySelector('.pc-title'), 'click');
    eventFire(document.querySelectorAll('[data-pc-timestamp]')[0], 'click');
    expect(calendar.state instanceof YearState).toBe(true);
    expect(calendar.scope.getTime() === new Date('2010-02-01').getTime()).toBe(true);
    expect(document.body).toMatchSnapshot();
  });
})


describe('Events', () => {
  it('it should listen the "prev" event', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date
    });

    const callback = jest.fn();
    calendar.on('prev', callback);

    eventFire(document.querySelector('.pc-pointer-left'), 'click');
    expect(callback).toBeCalledTimes(1);
  });

  it('it should listen the "next" event', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date
    });

    const callback = jest.fn();
    calendar.on('next', callback);

    eventFire(document.querySelector('.pc-pointer-right'), 'click');
    expect(callback).toBeCalledTimes(1);
  });

  it('it should listen the "state-changed" event', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date
    });

    const callback = jest.fn(state => state);
    calendar.on('state-changed', callback);

    eventFire(document.querySelector('.pc-title'), 'click');
    eventFire(document.querySelector('.pc-title'), 'click');
    eventFire(document.querySelectorAll('[data-pc-timestamp]')[0], 'click');
    eventFire(document.querySelectorAll('[data-pc-timestamp]')[0], 'click');
    expect(callback).toBeCalledTimes(4);
    expect(callback.mock.results[0].value).toBe('YearState');
    expect(callback.mock.results[1].value).toBe('DecadeState');
    expect(callback.mock.results[2].value).toBe('YearState');
    expect(callback.mock.results[3].value).toBe('MonthState');
  });

  it('it should listen the "date-changed" event', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date
    });

    const callback = jest.fn(date => date);
    calendar.on('date-changed', callback);

    eventFire(document.querySelectorAll('[data-pc-timestamp]')[0], 'click');
    expect(callback).toBeCalledTimes(1);
    expect(callback.mock.results[0].value.getTime()).toEqual(new Date('2019-01-28').getTime())
  });

  it('it should unsubscribe', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date
    });

    const callback = jest.fn();
    calendar.on('prev', callback);
    eventFire(document.querySelector('.pc-pointer-left'), 'click');
    calendar.unsubscribe('prev', callback);
    eventFire(document.querySelector('.pc-pointer-left'), 'click');
    expect(callback).toBeCalledTimes(1);
  });
});


describe('API', () => {
  it('it should call the prev() method', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date
    });

    calendar.api.prev();
    eventFire(document.querySelector('.pc-pointer-left'), 'click');
    expect(document.body).toMatchSnapshot();
  });

  it('it should call the next() method', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date
    });

    calendar.api.next();
    eventFire(document.querySelector('.pc-pointer-right'), 'click');
    expect(document.body).toMatchSnapshot();
  });

  it('it should call the changeState() method', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date
    });

    expect(() => {
      calendar.api.changeState('unknown');
    }).toThrow();

    calendar.api.changeState('MonthState');
    expect(calendar.state instanceof MonthState).toBe(true);
    expect(document.body).toMatchSnapshot();
    calendar.api.changeState('YearState');
    expect(calendar.state instanceof YearState).toBe(true);
    expect(document.body).toMatchSnapshot();
    calendar.api.changeState('DecadeState');
    expect(calendar.state instanceof DecadeState).toBe(true);
    expect(document.body).toMatchSnapshot();
  });

  it('it should call the changeScope() method', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date
    });

    calendar.api.changeScope(new Date('2019-01-05'));
    expect(calendar.scope.getTime() === new Date('2019-01-05').getTime()).toBe(true);
    expect(document.body).toMatchSnapshot();
  });

  it('it should call the changeDate() method', () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const calendar = new Calendar('#root', {
      selectedDate: date
    });

    calendar.api.changeDate(new Date('2019-01-05'));
    const { selectedDate } = calendar.options;
    expect(selectedDate && selectedDate.getTime() === new Date('2019-01-05').getTime()).toBe(true);
    expect(document.body).toMatchSnapshot();
  });
});
