import Publisher from './Publisher';

describe('Publisher.ts', () => {
  it('it should initialize without errors', () => {
    expect(() => {
      const publisher = new Publisher();
    }).not.toThrow();

    expect(true);
  });

  it('it should notify subscribers', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const mock3 = jest.fn();

    const publisher = new Publisher();
    publisher.subscribe('event1', mock1);
    publisher.subscribe('event1', mock2);
    publisher.subscribe('event2', mock3);
    publisher.notify('event1');

    expect(mock1).toBeCalled();
    expect(mock2).toBeCalled();
    expect(mock3).not.toBeCalled();
  });

  it('it should notify subscribers with some data', () => {
    const mock1 = jest.fn(data => data);

    const publisher = new Publisher();
    publisher.subscribe('event1', mock1);
    publisher.notify('event1', 'some data');
    expect(mock1.mock.calls[0][0]).toBe('some data');
  });

  it('it should unsubscribe', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const mock3 = jest.fn();

    const publisher = new Publisher();
    publisher.subscribe('event1', mock1);
    publisher.subscribe('event1', mock2);
    const unsubscribe = publisher.subscribe('event1', mock3);

    publisher.notify('event1');

    publisher.unsubscribe('event1', mock2);
    unsubscribe();

    publisher.notify('event1');

    expect(mock1).toBeCalledTimes(2);
    expect(mock2).toBeCalledTimes(1);
    expect(mock3).toBeCalledTimes(1);
  });
});
