import compress from 'compression';
import express from 'express';
import path from 'path';
import config from '../config/config';

const app = express();

const MILLISECONDS_IN_A_DAY = 86400000;
const NO_OF_DAYS = 30;
const cacheTime = MILLISECONDS_IN_A_DAY * NO_OF_DAYS;

app.use(compress());
if (process.env.NODE_ENV === 'development') {
  const webpackConfig = require('../webpack/webpack.browser.config');
  const compiler = require('webpack')(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
    },
    watchOptions: {
      poll: true,
    },
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    quiet: true,
    noInfo: true,
    log: console.log,
    path: '/__webpack_hmr',
  }));
}

app.use('/js/?',
  express.static(path.join(__dirname, '/../build/js'), { maxAge: cacheTime }));
app.use('/js/?',
  express.static(path.join(__dirname, '/../src/static/js'), { maxAge: cacheTime }));
app.use('/js/?',
  express.static(path.join(__dirname, '/../src/vendors'), { maxAge: cacheTime }));
app.use('/css/?',
  express.static(path.join(__dirname, '/../build/css'), { maxAge: cacheTime }));
app.use('/css/?',
  express.static(path.join(__dirname, '/../src/static/css'), { maxAge: cacheTime }));
app.use('/images/?',
  express.static(path.join(__dirname, '/../src/static/images'), { maxAge: cacheTime }));
app.use('/manifest/?',
  express.static(path.join(__dirname, '/../src/static/manifest')));

// For Home page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/../build/index.html')));

const port = process.env.PORT || config.serverPort;
app.listen(port, () => console.log(`Listening on: ${port}`));
