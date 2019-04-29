import ISubscriber from './ISubscriber';

/**
 *
 */
class Publisher {
  /**
   * Array of subscribers.
   *
   * @type {ISubscriber[]}
   */
  private subscribers: ISubscriber[];

  /**
   * Initialization.
   */
  constructor() {
    this.subscribers = [];
  }

  /**
   * Adding a new subscriber to the list.
   * Return an unsubscribing function.
   *
   * Example:
   * const unsubscribe = publisher.subscribe('eventName', () => console.log('Triggered!'));
   * unsubscribe();
   *
   * @param {string}   eventType
   * @param {Function} callback
   */
  public subscribe(eventType: string, callback: () => void): () => void {
    this.subscribers = [...this.subscribers, { eventType, callback }];

    return () => {
      this.unsubscribe(eventType, callback);
    };
  }

  /**
   * Removing an existing subscriber from the list.
   *
   * @param {string}   eventType
   * @param {Function} callback
   */
  public unsubscribe(eventType: string, callback: () => void): void {
    this.subscribers = this.subscribers.filter((s: ISubscriber) => s.eventType === eventType && s.callback !== callback);
  }

  /**
   * Notifying all subscribers.
   *
   * @param {string} eventType [description]
   */
  public notify(eventType: string, payload: any = null) {
    this.subscribers
      .filter((s: ISubscriber) => s.eventType === eventType)
      .forEach((s: ISubscriber) => (payload ? s.callback(payload) : s.callback()));
  }
}

export default Publisher;
