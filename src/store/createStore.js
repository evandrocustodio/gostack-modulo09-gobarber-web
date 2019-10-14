import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, meddlewares) => {
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(
          console.tron.createEnhancer(),
          applyMiddleware(...meddlewares)
        )
      : applyMiddleware(...meddlewares);

  return createStore(reducers, enhancer);
};
