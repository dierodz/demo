import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { SET_USERS, SET_USER_DETAIL } from './actionsNames'

const initialState = {
  users: undefined,
  userDetail: undefined
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: action.payload
      }
    }
    case SET_USER_DETAIL: {
      return {
        ...state,
        userDetail: action.payload
      }
    }
    default: {
      return state
    }
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store;
