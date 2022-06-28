const ofMap =
  <T>() =>
  <R extends Record<string, T>>(map: R): R =>
    map;

export default ofMap;
