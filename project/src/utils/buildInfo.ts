// Auto-generated build info - DO NOT EDIT MANUALLY
export const BUILD_INFO = {
  version: '1.0.0',
  timestamp: 1751624444000,
  buildDate: new Date().toISOString(),
  gitCommit: 'cache-busting-deployment'
};

// Cache busting helpers
export const getCacheBustParam = () => `v=${BUILD_INFO.timestamp}`;
export const addCacheBust = (url: string) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${getCacheBustParam()}`;
};
