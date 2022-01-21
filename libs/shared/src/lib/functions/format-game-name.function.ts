export const formatGameName = (name: string): string => {
  return name ? name.toLowerCase().replace(/\xs/g, '') : '';
};
