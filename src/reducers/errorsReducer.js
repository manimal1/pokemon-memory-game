import { ERRORS } from 'appConstants'

const { GET_ERRORS, CLEAR_ERRORS } = ERRORS

const initialState = {}

export const errorsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_ERRORS:
      return payload
    case CLEAR_ERRORS:
      return {}
    default:
      return state
  }
}

export default errorsReducer
