import { createStore } from "redux";
import myredux from './index'

const store =createStore(myredux,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
