import { DiFiles } from '@/di';
import { applyMiddleware, createStore as reduxCreateStore } from 'redux';
import rootSaga from '../sagas';
import getMiddlewares from './middlewares';
import rootReducer from './rootReducer';

const createStore = (diFiles: DiFiles[]) => {
  const { middlewares, sagaMiddleware } = getMiddlewares(diFiles);

  const store = reduxCreateStore(rootReducer, applyMiddleware(...middlewares));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;
