import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { createNewStore } from '../../store/mainStore';
import { getCurrentUrl } from '../../helpers/urlHelpers';
import routes from '../../routes';
import track from '../../track';
import './main-container.scss';

export default class MainContainer extends React.Component {
  constructor() {
    super();
    this.myStore = createNewStore(window.INITIAL_STATE);
    this.state = this.myStore.getState();
  }

  componentDidMount() {
    const currentUrl = getCurrentUrl();
    track.homeView();
    track.homeViewGa(currentUrl);
  }

  render() {
    const history = createHistory();
    return (
      <div>
        <Provider store={this.myStore}>
          <ConnectedRouter history={history}>
            { routes }
          </ConnectedRouter>
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
