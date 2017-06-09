import mixpanel from './mixpanel';
import trackPageView from './helpers/trackPageView';

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
