function trackPageView(path) {
  if (typeof document === 'undefined' || window.ga === undefined) {
    return;
  }
  window.ga('send', 'pageview', path);
}

export default trackPageView;
