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
declare class Publisher {
    /**
     * Array of subscribers.
     *
     * @type {Array<Subscriber>}
     */
    private subscribers;
    /**
     * Initialization.
     */
    constructor();
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
    subscribe(eventType: string, callback: Function): Function;
    /**
     * Removing an existing subscriber from the list.
     *
     * @param {string}   eventType
     * @param {Function} callback
     */
    unsubscribe(eventType: string, callback: Function): void;
    /**
     * Notifying all subscribers.
     *
     * @param {string} eventType [description]
     */
    notify(eventType: string, payload?: any): void;
}
export default Publisher;
