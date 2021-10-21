import { DiFiles } from '@/di';
import { Middleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

type GetMiddlewaresReturnType = {
  middlewares: Middleware[];
  sagaMiddleware: SagaMiddleware;
};

const getMiddlewares = (diFiles: DiFiles[]): GetMiddlewaresReturnType => {
  const sagaMiddleware = createSagaMiddleware({
    context: diFiles.reduce(
      (acc, { module, name }) => ({
        ...acc,
        [name]: module
      }),
      {}
    )
  });

  const middlewares: Middleware[] = [sagaMiddleware];

  if (process.env.NODE_ENV === 'development') middlewares.push(logger);

  return {
    middlewares,
    sagaMiddleware
  };
};

export default getMiddlewares;
