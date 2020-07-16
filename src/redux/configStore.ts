import { createStore, applyMiddleware, compose } from 'redux'
// import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './modules'
import rootSaga from './sagas'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  sagaMiddleware,
  // logger
]

// if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp') {
//   middlewares.push(require('redux-logger').createLogger())
// }

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)

export default function configStore () {
  const store = createStore(rootReducer, enhancer)
  sagaMiddleware.run(rootSaga)
  return store
}

export type RootState = ReturnType<typeof rootReducer>
