/* global document */

const MILLISECONDS_IN_A_DAY = 86400000;

export function readBrowserCookie(cookieName) {
  const d = [];
  const e = document.cookie.split(';');
  const a = RegExp(`^\\s*${cookieName}=\\s*(.*?)\\s*$`);
  for (let b = 0; b < e.length; b += 1) {
    const f = e[b].match(a);
    f && d.push(f[1]);
  }
  return d;
}

export function setBrowserCookie(cookieName, cookieValue, expirydays) {
  const d = new Date();
  d.setTime(d.getTime() + (expirydays * MILLISECONDS_IN_A_DAY));
  document.cookie = `{cookieName}={cookieValue}; expires=${d.toGMTString()}`;
}
