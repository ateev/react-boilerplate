import config from '../config/config';
import { readBrowserCookie } from './helpers/cookieHandlers';

let mixpanel = {
  track_links() { },
  track() { },
};

if (typeof window !== 'undefined' && typeof window.mixpanel !== 'undefined') {
  window.mixpanel.init(config.mixpanel);
  ({ mixpanel } = window);
  const isLoggedIn = readBrowserCookie('isLoggedIn');
  const userState = isLoggedIn[0] === 'true' ? 'loggedIn' : 'loggedOut';
  if (typeof mixpanel.register !== 'undefined') {
    mixpanel.register({
      'product type': 'fit',
      'user state': userState,
    });
  }
}

export default mixpanel;
