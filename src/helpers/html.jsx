import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import ga from '../vendors/ga.js';
import { createNewStore } from '../store/mainStore.js';
import config from '../../config/config.js';
import stats from '../stats.json';
import routes from '../routes.jsx';
import asyncSrc from './async-scripts.js';
import addMultipleOnLoad from './multiple-on-load.js';

const gaScript = ga.replace('{trackingId}', config.gaId);
let mixpanelScript = '';

if (process.env.MONITORING === 'true') {
  mixpanelScript = '<script type="text/javascript" async-src="/js/mixpanel.js"></script>';
}

let mainSrc = stats.home[0].split('/');
mainSrc = mainSrc[mainSrc.length - 1];

let cssSrc = stats.home[1].split('/');
cssSrc = cssSrc[cssSrc.length - 1];

let vendorsSrc;
if (typeof stats.vendors === 'string') {
  vendorsSrc = stats.vendors.split('/');
} else {
  vendorsSrc = stats.vendors[0].split('/');
}
vendorsSrc = vendorsSrc[vendorsSrc.length - 1];

export function renderHomePage(req) {
  const mainStore = createNewStore();
  let app;
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (renderProps) {
      app = (
        <Provider store={mainStore} >
          <RouterContext {...renderProps} />
        </Provider>
      );
    }
  });

  let noIndexTag = '';
  if (process.env.NODE_ENV !== 'production') {
    noIndexTag = '<META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">';
  }

  const appString = ReactDOMServer.renderToString(app);
  const head = Helmet.rewind();
  const initialState = mainStore.getState();


  return `
		<html lang="en-us">
			<head>
        <meta charset="utf-8">
        ${head.title}
        ${head.meta}
        <link rel="manifest" href="/manifest/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="stylesheet" type="text/css" href="/css/bootstrap-custom.min.css" />
				<link rel="stylesheet" type="text/css" href="/css/${cssSrc}"/>
        ${noIndexTag}
        ${mixpanelScript}
			</head>
			<body>
        <div id="bodyOverlay"></div>
				<div id="mainContainer">
          <div>
            ${appString}
          </div>
        </div>
				<script>
					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
				</script>
        <script type="text/javascript" async-src="/js/${vendorsSrc}"></script>
        <script type="text/javascript" async-src="/js/${mainSrc}"></script>
        <script async src='//www.google-analytics.com/analytics.js'></script>
        <script type="text/javascript">
          ${asyncSrc}
        </script>
        <script type="text/javascript">
          ${addMultipleOnLoad}
        </script>
        <script type="text/javascript">
          function addGa() {
            var asyncScript = document.createElement("script");
            asyncScript.src = "//www.google-analytics.com/analytics.js";
            asyncScript.onload = function() {
              ${gaScript}
            };
            document.head.appendChild(asyncScript);
          }
          addLoadEvent(addGa);
        </script>
			</body>
		</html>
	`;
}
