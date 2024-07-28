
import { combineReducers } from '@reduxjs/toolkit';
import setContentReducer from './content';
import setIdUserReducer from './idUser';
const rootReducer = combineReducers({
    setContentReducer: setContentReducer,
    setIdUserReducer: setIdUserReducer,
});

export default rootReducer;