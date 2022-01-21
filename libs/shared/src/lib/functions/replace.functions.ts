export const replaceLanguageKeyInString = (
  value: string,
  key1: string,
  key2: string
): string => {
  return value.replace(key1, key2);
};
