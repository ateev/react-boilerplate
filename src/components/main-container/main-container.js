import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from '../../routes.jsx';
import { createNewStore } from '../../store/mainStore.js';
import track from '../../track.js';
import { getCurrentUrl } from '../../helpers/urlHelpers.js';
import './main-container.scss';

export default class MainContainer extends React.Component {
  constructor() {
    super();
    this.myStore = createNewStore(window.__INITIAL_STATE__);
    this.state = this.myStore.getState();
  }

  componentDidMount() {
    const currentUrl = getCurrentUrl();
    track.homeView();
    track.homeViewGa(currentUrl);
  }

  render() {
    const history = browserHistory;
    syncHistoryWithStore(history, this.myStore);
    return (
      <div>
        <Provider store={this.myStore}>
          <Router history={history}>
            { routes }
          </Router>
        </Provider>
      </div>
    );
  }
}
if (typeof window !== 'undefined') {
  ReactDOM.render(
    <MainContainer />,
    document.getElementById('mainContainer'),
  );
}
