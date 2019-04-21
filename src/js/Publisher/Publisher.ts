import Subscriber from "./Subscriber";

/**
 * Available event types:
 *
 * *mounted*, 
 * state-updated, 
 * prev-clicked, 
 * next-clicked, 
 * center-clicked, 
 * 
 * year-changed, 
 * month-changed, 
 * day-changed,
 * date-selected,
 * 
 */
class Publisher {
  /**
   * Array of subscribers.
   *
   * @type {Array<Subscriber>}
   */
  private subscribers: Array<Subscriber>;

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
  public subscribe(eventType: string, callback: Function): Function {
    this.subscribers = [...this.subscribers, { eventType, callback }];

    return () => {
      this.unsubscribe(eventType, callback);
    }
  }

  /**
   * Removing an existing subscriber from the list.
   *
   * @param {string}   eventType
   * @param {Function} callback
   */
  public unsubscribe(eventType: string, callback: Function): void {
    this.subscribers = this.subscribers.filter(
      (s: Subscriber) => s.eventType === eventType && s.callback !== callback
    );
  }

  /**
   * Notifying all subscribers.
   *
   * @param {string} eventType [description]
   */
  public notify(eventType: string, payload: any = null) {
    this.subscribers
      .filter((s: Subscriber) => s.eventType === eventType)
      .forEach((s: Subscriber) => (payload ? s.callback(payload) : s.callback()));
  }
}

export default Publisher;
