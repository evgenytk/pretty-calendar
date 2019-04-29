interface ISubscriber {
  eventType: string;
  callback: (payload?: any) => void;
}

export default ISubscriber;
