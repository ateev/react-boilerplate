import mixpanel from './mixpanel.js';
import trackPageView from './helpers/trackPageView.js';

// Change this
const track = {
  homeView() {
    mixpanel.track(
      'home view', {
        'page url': '/project-home-page',
      },
    );
    trackPageView('/');
  },
  homeViewGa(currentUrl) {
    trackPageView(currentUrl);
  },
};
export default track;
