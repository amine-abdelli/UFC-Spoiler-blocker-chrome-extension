export function getChannelHandleFromUrl(url: string): string | null {
  const regex = /https:\/\/www\.youtube\.com\/(@[a-zA-Z0-9_]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function throttle<T extends (...args: any[]) => void>(func: T, limit: number) {
  let lastFunc: number;
  let lastRan: number;
  return function (this: unknown, ...args: Parameters<T>): void {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}
