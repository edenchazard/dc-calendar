const theCache: { [x: string]: unknown } = {};

export function cache<T>(key: string, callback: () => T) {
  if (key in theCache) {
    return theCache[key];
  }

  return (theCache[key] = callback());
}
