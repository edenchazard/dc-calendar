const theCache: { [x: string]: any } = {};

export function cache(key: string, callback: () => any) {
  if (key in theCache) {
    return theCache[key];
  }

  return (theCache[key] = callback());
}
