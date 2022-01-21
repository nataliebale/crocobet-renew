// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { join } from 'path';
import { readFileSync } from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const domino = require('domino');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xmldom = require('xmldom');

const template = readFileSync(
  join(process.cwd(), 'dist/apps/crocobet-web/browser', 'index.html')
).toString();
const win = domino.createWindow(template);

(global as any).$ = {};
(global as any).window = win;
(global as any).self = win;
(global as any).parent = win.parent;
(global as any).document = win.document;
(global as any).localStorage = win.localStorage;
// eslint-disable-next-line @typescript-eslint/no-empty-function
(global as any).window.history.pushState = () => {};
(global as any).Element = win.Element;
(global as any).Event = win.Event;
(global as any).KeyboardEvent = win.KeyboardEvent;
(global as any).MouseEvent = win.MouseEvent;
(global as any).FocusEvent = win.FocusEvent;
(global as any).PointerEvent = win.PointerEvent;
(global as any).HTMLElement = win.HTMLElement;
(global as any).HTMLElement.prototype.getBoundingClientRect = () => {
  return {
    bottom: '',
    left: '',
    right: '',
    top: ''
  };
};
// eslint-disable-next-line @typescript-eslint/no-var-requires
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
(global as any).DOMParser = xmldom.DOMParser;
// tslint:disable-next-line:no-empty
Object.defineProperty(document, 'referrer', { writable: true });
Object.defineProperty(window, 'innerWidth', { writable: true });
Object.defineProperty(window, 'innerHeight', { writable: true });
// eslint-disable-next-line @typescript-eslint/no-empty-function
Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      configurable: true,
      enumerable: true
    };
  }
});

// Override default setTimeout/cleatTimeout and setInterval/clearInterval
const setTimeoutDelayLimit = 5000;
const setTimeoutCheckInterval = 100;
const timeouts = {};

const nativeClearTimeout = global.clearTimeout;
const nativeSetTimeout = global.setTimeout;

global.clearTimeout = (timeoutId) => {
  delete timeouts[timeoutId];
  return nativeClearTimeout(timeoutId);
};

(global as any).setTimeout = (listener, delay) => {
  // eslint-disable-next-line prefer-const
  let timerId;
  // Prevent loging timeouts with 0 delay
  if (delay) {
    let elapsed = 0;
    const tempIntervalId = nativeSetInterval(() => {
      elapsed += setTimeoutCheckInterval;
      if (
        (elapsed >= delay && elapsed <= setTimeoutDelayLimit) ||
        !timeouts[timerId]
      ) {
        nativeClearInterval(tempIntervalId);
        delete timeouts[timerId];
      } else if (elapsed > setTimeoutDelayLimit) {
        nativeClearInterval(tempIntervalId);
        delete timeouts[timerId];

        console.error(
          `SSR:${global['requestId']} Timeout ${delay}ms delayed
                    more than ${setTimeoutDelayLimit}ms at page: `,
          global.window.location.href
        );
      }
    }, setTimeoutCheckInterval);
  }

  timerId = nativeSetTimeout(listener, delay);
  timeouts[timerId] = true;

  return timerId;
};

const setIntervalDelayLimit = 1000;
const setIntervalCheckInterval = 100;
const intervals = {};

const nativeClearInterval = global.clearInterval;
const nativeSetInterval = global.setInterval;

global.clearInterval = (intervalId) => {
  delete intervals[intervalId];
  return nativeClearInterval(intervalId);
};
global.setInterval = (listener, delay) => {
  // eslint-disable-next-line prefer-const
  let intervalId;
  // Async pipe creates interval with delay 0
  if (delay) {
    let elapsed = 0;
    const tempIntervalId = nativeSetInterval(() => {
      if (!intervals[intervalId]) {
        nativeClearInterval(tempIntervalId);
        delete intervals[intervalId];
      } else if (elapsed > setIntervalDelayLimit) {
        nativeClearInterval(tempIntervalId);
        delete intervals[intervalId];

        console.error(
          `SSR:${global['requestId']} Interval ${delay}ms delayed
                     more than ${setIntervalDelayLimit}ms at page: `,
          global.window.location.href
        );
      }
      elapsed += setIntervalCheckInterval;
    }, setIntervalCheckInterval);
  }

  intervalId = nativeSetInterval(listener, delay);
  intervals[intervalId] = true;

  return intervalId;
};
