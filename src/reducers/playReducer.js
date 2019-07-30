import { PLAY, CONSOLE } from 'appConstants'

const {
  SET_COMPLETE_SEQUENCE,
  SET_PARTIAL_SEQUENCE,
  SET_PLAYER_SEQUENCE,
  UDPATE_COMPUTER_TURN_COUNT,
  UPDATE_PLAYER_TURN_COUNT,
  SWITCH_TURNS,
  COMPUTER_TURN,
  PLAYER_CONTINUES,
  PLAYER_WINS,
  PLAYER_LOSES
} = PLAY

const initialState = {
  completeSequence: [],
  partialSequence: [],
  playerSequence: [],
  turn: '',
  playerTurnCount: 0,
  computerTurnCount: 0
}

export const playReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_COMPLETE_SEQUENCE:
      return {
        ...state,
        completeSequence: payload
      }

    case SET_PARTIAL_SEQUENCE:
      return {
        ...state,
        partialSequence: payload
      }

    case SET_PLAYER_SEQUENCE:
      return {
        ...state,
        playerSequence: payload
      }

    case UDPATE_COMPUTER_TURN_COUNT:
      return {
        ...state,
        computerTurnCount: payload
      }

    case UPDATE_PLAYER_TURN_COUNT: {
      return {
        ...state,
        playerTurnCount: payload
      }
    }

    case SWITCH_TURNS:
      return {
        ...state,
        turn: payload
      }

    case PLAYER_CONTINUES:
      return {
        ...state,
        partialSequence: payload,
        turn: COMPUTER_TURN,
        playerSequence: [],
        playerTurnCount: 0
      }

    case PLAYER_WINS:
      return {
        ...initialState
      }

    case PLAYER_LOSES:
      return {
        ...initialState
      }

    case CONSOLE.RESTART:
      return {
        ...initialState
      }

    default:
      return state
  }
}

export default playReducer
