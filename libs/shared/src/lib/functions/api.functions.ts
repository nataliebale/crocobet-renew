/* TODO has extra knowledge */
export const isCrcApi = (url: string): boolean => {
  const [subdomain, domain] = url.split('//')[1].split('.');
  return (
    subdomain.includes('api') && domain === 'crocobet' && url.includes('rest')
  );
};

export const isCmsApi = (url: string): boolean => {
  const [subdomain, domain] = url.split('//')[1].split('.');
  return (
    subdomain.includes('cms') &&
    domain === 'crocobet' &&
    url.includes('campaigns')
  );
};

export const isCrcAuthApi = (url: string): boolean => {
  const [subdomain, domain] = url.split('//')[1].split('.');

  return subdomain.includes('proxylogin') && domain === 'crocobet';
};

export const isCardsApi = (url: string): boolean => {
  const [subdomain, domain] = url.split('//')[1].split('.');

  return subdomain.includes('cards') && domain === 'crocobet';
};

export const isIdentomatApi = (url: string): boolean => {
  const [subdomain, domain] = url.split('//')[1].split('.');

  return subdomain.includes('customers01') && domain === 'crocobet';
};
