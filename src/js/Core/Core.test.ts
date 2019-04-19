import Core from './Core';

describe('Core.ts', () => {
  it('it should initialize without errors', () => {
    expect(() => {
      const core0 = new Core();
      const core1 = new Core({
        firstDay: 0
      });
      const core2 = new Core({
        firstDay: 6
      });
    }).not.toThrow();

    expect(true);
  });

  it('it should throw error of the incorrect week day name', () => {
    expect(() => {
      const core = new Core({
        firstDay: 9
      });
    }).toThrow();
  });

  it('it should return month names', () => {
    const core = new Core();
    expect(core.getMonthNames().length).toEqual(12);
  });

  it('it should return the week names', () => {
    const core = new Core();
    expect(core.getWeekdayNames().length).toEqual(7);
    expect(core.getWeekdayNames()[0]).toEqual('Mo');
  });

  it('it should return the week names with offset', () => {
    expect(new Core({firstDay: 0}).getWeekdayNames()[0]).toEqual('Su');
    expect(new Core({firstDay: 1}).getWeekdayNames()[0]).toEqual('Mo');
    expect(new Core({firstDay: 2}).getWeekdayNames()[0]).toEqual('Tu');
    expect(new Core({firstDay: 3}).getWeekdayNames()[0]).toEqual('We');
    expect(new Core({firstDay: 4}).getWeekdayNames()[0]).toEqual('Th');
    expect(new Core({firstDay: 5}).getWeekdayNames()[0]).toEqual('Fr');
    expect(new Core({firstDay: 6}).getWeekdayNames()[0]).toEqual('Sa');
  });

  it('it should return days grid', () => {
    // Checking title
    expect(new Core().getDays(new Date('2019-01-01')).title).toEqual('January, 2019');
    expect(new Core().getDays(new Date('2018-12-01')).title).toEqual('December, 2018');
    expect(new Core().getDays(new Date('2019-01-01')).title).toEqual('January, 2019');
    expect(new Core().getDays(new Date('2019-12-01')).title).toEqual('December, 2019');

    // Checking size
    expect(new Core().getDays(new Date('2019-01-01')).items.length).toEqual(42);

    expect(new Core().getDays(new Date('2019-01-01')).items[1].getDate()).toEqual(1);
    expect(new Core().getDays(new Date('2019-01-01')).items[31].getDate()).toEqual(31);
    expect(new Core().getDays(new Date('2019-01-01')).items[1].getMonth()).toEqual(0);
    expect(new Core().getDays(new Date('2019-01-01')).items[31].getMonth()).toEqual(0);
    expect(new Core().getDays(new Date('2019-01-01')).items[1].getFullYear()).toEqual(2019);
    expect(new Core().getDays(new Date('2019-01-01')).items[31].getFullYear()).toEqual(2019);

    // Checking date offset
    expect(new Core({firstDay: 0}).getDays(new Date('2019-01-01')).items[0].getDate()).toEqual(30);
    expect(new Core({firstDay: 0}).getDays(new Date('2019-01-01')).items[41].getDate()).toEqual(9);
    expect(new Core().getDays(new Date('2019-12-01')).items[0].getDate()).toEqual(25);
    expect(new Core().getDays(new Date('2019-12-01')).items[41].getDate()).toEqual(5);
    expect(new Core({firstDay: 0}).getDays(new Date('2019-12-01')).items[0].getDate()).toEqual(1);
    expect(new Core({firstDay: 0}).getDays(new Date('2019-12-01')).items[41].getDate()).toEqual(11);
  });

  it('it should return months grid', () => {
    expect(new Core().getMonths(new Date('2019-01-01')).title).toEqual('2019');
    expect(new Core().getMonths(new Date('2019-01-01')).items.length).toEqual(12);
    expect(new Core().getMonths(new Date('2019-01-01')).items[0].getFullYear()).toEqual(2019);
    expect(new Core().getMonths(new Date('2019-01-01')).items[11].getFullYear()).toEqual(2019);
    expect(new Core().getMonths(new Date('2019-01-01')).items[11].getMonth()).toEqual(11);
    expect(new Core().getMonths(new Date('2019-01-01')).items[0].getMonth()).toEqual(0);
    expect(new Core().getMonths(new Date('2019-01-01')).items[11].getMonth()).toEqual(11);
  });

  it('it should return years grid', () => {
    expect(new Core().getYears(new Date('2019-01-01')).title).toEqual('2010 - 2019');
    expect(new Core().getYears(new Date('2019-01-01')).items.length).toEqual(10);
    expect(new Core().getYears(new Date('2019-01-01')).items[0].getFullYear()).toEqual(2010);
    expect(new Core().getYears(new Date('2019-01-01')).items[9].getFullYear()).toEqual(2019);
  });
})