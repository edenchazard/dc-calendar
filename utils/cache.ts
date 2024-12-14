const theCache: { [x: string]: unknown } = {};

export function cache<T>(key: string, callback: () => T): T {
  if (key in theCache) {
    return theCache[key] as T;
  }

  return (theCache[key] = callback());
}
