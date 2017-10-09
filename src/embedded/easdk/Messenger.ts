// tslint:disable-next-line no-require-imports no-var-requires
const CoreWeakMap: typeof WeakMap = require('core-js/library/es6/weak-map');

export interface Message {
  message: string,
  data: any,
}

export interface Handler {
  (data: object): void,
}

export interface HandlerMap {
  [type: string]: Handler,
}

type CallbackID = string;
type Callback = (...args: any[]) => void;

export interface Options {
  name: string,
  targetOrigin: string,
  debug?: boolean,
}

export default class Messenger {
  private name: string;
  private targetOrigin = '*';
  private debug: boolean;
  private queue: Message[] = [];
  private callbacks: {[key: string]: Callback} = {};
  private callbacksToID = new CoreWeakMap<Callback, CallbackID>();
  private callbackIndex = 0;

  constructor(private target: Window | null | undefined, private handlers: HandlerMap, options: Options) {
    if (typeof window === 'undefined') {
      return;
    }

    this.name = options.name;
    this.targetOrigin = options.targetOrigin;
    this.debug = options.debug || false;

    if (!this.targetOrigin.match(/^http(s)?:\/\//)) {
      this.warn('warning: targetOrigin should include the protocol');
    }

    window.addEventListener('message', this.handleMessage.bind(this), false);
  }

  setTarget(target: Window | null | undefined) {
    this.target = target;
    this.tryToDequeue();
  }

  send(message: Message['message'], data?: Message['data']): Message['data'] {
    const normalizedPayload = this.normalizePayload(data);
    const newMessage: Message = {
      message,
      data: normalizedPayload,
    };

    const messageString = JSON.stringify(newMessage);

    if (this.target != null) {
      this.log(`Posting message: ${messageString} to ${this.targetOrigin} }`);
      this.target.postMessage(messageString, this.targetOrigin);
    } else {
      this.log(`Queueing message: ${messageString}`);
      this.queue.push(newMessage);
    }

    return normalizedPayload;
  }

  private tryToDequeue() {
    const {queue, target} = this;

    if (target == null || queue.length === 0) {
      return;
    }

    this.queue.forEach((message) => {
      target.postMessage(message, '*');
    });

    this.queue.length = 0;
  }

  private log(message: string) {
    if (!this.debug) { return; }

    // tslint:disable-next-line no-console
    console.log(`[${this.name} Messenger]: ${message}`);
  }

  private warn(message: string) {
    if (!this.debug) { return; }

    // tslint:disable-next-line no-console
    console.warn(`[${this.name} Messenger]: ${message}`);
  }

  private storeCallback(callback: Callback): CallbackID {
    // Optimization, so we don’t store a new callback ID for callbacks
    // we have sent before
    if (this.callbacksToID.has(callback)) {
      return this.callbacksToID.get(callback) as CallbackID;
    }

    const id = `EASDKCallback${this.callbackIndex++}`;
    this.callbacks[id] = callback;
    this.callbacksToID.set(callback, id);

    return id;
  }

  private normalizePayload(payload: any): any {
    if (payload == null) {
      return payload;
    }

    if (typeof payload === 'function') {
      return this.storeCallback(payload);
    } else if (payload instanceof Array) {
      return payload.map((newPayload) => {
        return this.normalizePayload(newPayload);
      });
    } else if (typeof payload === 'object') {
      return Object.keys(payload).reduce((newPayload, key) => {
        newPayload[key] = this.normalizePayload(payload[key]);
        return newPayload;
      }, {} as Message['data']);
    } else {
      return payload;
    }
  }

  private handleMessage(event: MessageEvent) {
    if (!this.isFromTargetOrigin(event)) {
      this.log(`client received ${event.data} from unknown origin ${event.origin}. Expected ${this.targetOrigin}`);
      return;
    }

    this.log(`Received message: ${event.data} from ${event.origin}`);

    let receivedMessage;
    try {
      receivedMessage = JSON.parse(event.data) as Message;
    } catch (error) {
      // tslint:disable-next-line
      console.error(`Received received invalid JSON and cannot process the message. ${error} : ${event.data} : ${JSON.stringify(event.data)}`);
      return;
    }

    this.invokeCallback(receivedMessage);
    this.invokeHandler(receivedMessage);

  }

  private isFromTargetOrigin({origin}: MessageEvent): boolean {
    return origin != null && origin === this.targetOrigin;
  }

  private invokeCallback(receivedMessage: Message) {
    const callback = this.callbacks[receivedMessage.message];
    if (typeof callback === 'function') {
      callback();
    }
  }

  private invokeHandler(receivedMessage: Message) {
    const handler = this.handlers[receivedMessage.message];
    if (typeof handler === 'function') {
      handler(receivedMessage.data);
    }
  }

}

