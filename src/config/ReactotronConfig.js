import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure({ host: '192.168.0.109' })
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  console.tron = tron;

  tron.clear();
}
