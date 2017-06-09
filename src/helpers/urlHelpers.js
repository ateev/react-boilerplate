export function getBaseUrl(host) {
  let currentHostName;
  if (typeof window !== 'undefined' && window.location.hostname.indexOf('www') !== -1) {
    currentHostName = window.location.hostname;
  } else if (host !== undefined && host.indexOf('localhost') === -1) {
    currentHostName = (host.match(/:/g)) ? host.slice(0, host.indexOf(':')) : host;
  }
  const baseUrl = `https://${currentHostName}`;
  return {
    baseUrl,
  };
}

export function getCurrentUrl() {
  let currentUrl = '';
  if (typeof window !== 'undefined') {
    currentUrl = window.location.href;
  }
  return currentUrl;
}
