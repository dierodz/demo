import axios from "axios"
import { SET_USERS, SET_USER_DETAIL } from "./actionsNames"

export function getAllUsers() {
  return (dispatch) => {
    axios.get('http://localhost:3001/users').then(response => {
      dispatch({ type: SET_USERS, payload: response.data})
    })
  }
}
export function getUser(id) {
  return (dispatch) => {
    axios.get(`http://localhost:3001/users/${id}`).then(response => {
      dispatch({ type: SET_USER_DETAIL, payload: response.data})
    }).catch(error => {
      if(error.response?.status !== 404) alert("Algo malio sal 😅")
      dispatch({ type: SET_USER_DETAIL, payload: null })
    })
  }
}
export function clearUser() {
  return {
    type: SET_USER_DETAIL, payload: undefined
  }
}