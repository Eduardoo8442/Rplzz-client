
import { combineReducers } from '@reduxjs/toolkit';
import setContentReducer from './content';
import setIdUserReducer from './idUser';
import setUsersReducer from './users';
const rootReducer = combineReducers({
    setContentReducer: setContentReducer,
    setIdUserReducer: setIdUserReducer,
    setUsersReducer:setUsersReducer,
});

export default rootReducer;