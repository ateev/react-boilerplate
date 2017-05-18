export function getBaseUrl(host) {
  if (typeof window !== 'undefined' && window.location.hostname.indexOf('www') !== -1) {
    const currentHostName = window.location.hostname;
    const fabUrl = `https://${currentHostName}`;
    return {
      fabUrl,
    };
  } else if (host !== undefined && host.indexOf('localhost') === -1) {
    const currentHostName = (host.match(/:/g)) ? host.slice(0, host.indexOf(':')) : host;
    const fabUrl = `https://${currentHostName}`;
    return {
      fabUrl,
    };
  }
}

export function getCurrentUrl() {
  let currentUrl = '';
  if (typeof window !== 'undefined') {
    currentUrl = window.location.href;
  }
  return currentUrl;
}
