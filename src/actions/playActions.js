import { APP, PLAY, NOTIFICATION } from 'appConstants'
import { setSequenceOfPlay } from 'utils/setSequenceOfPlay'

const {
  SET_COMPLETE_SEQUENCE,
  SET_PARTIAL_SEQUENCE,
  SET_PLAYER_SEQUENCE,
  UPDATE_PLAYER_TURN_COUNT,
  UDPATE_COMPUTER_TURN_COUNT,
  SWITCH_TURNS,
  PLAYER_TURN,
  COMPUTER_TURN,
  PLAYER_CONTINUES,
  PLAYER_WINS,
  PLAYER_LOSES
} = PLAY

export const setCompleteSequence = (pokemon) => {
  const playOrder = setSequenceOfPlay(pokemon, APP.TOTAL_TURNS)
  return {
    type: SET_COMPLETE_SEQUENCE,
    payload: playOrder
  }
}

export const setPartialSequence = arr => {
  return {
    type: SET_PARTIAL_SEQUENCE,
    payload: arr
  }
}

export const setPlayerSequence = playerSequence => {
  return {
    type: SET_PLAYER_SEQUENCE,
    payload: playerSequence
  }
}

export const updatePlayerTurnCount = playerTurnCount => {
  return {
    type: UPDATE_PLAYER_TURN_COUNT,
    payload: playerTurnCount
  }
}

export const updateComputerTurnCount = num => {
  return {
    type: UDPATE_COMPUTER_TURN_COUNT,
    payload: num
  }
}

export const switchTurnToPlayer = () => {
  return {
    type: SWITCH_TURNS,
    payload: PLAYER_TURN
  }
}

export const switchTurnToComputer = () => {
  return {
    type: SWITCH_TURNS,
    payload: COMPUTER_TURN
  }
}

export const handlePlayerLoses = () => {
  return {
    type: PLAYER_LOSES
  }
}

export const handleCheckPlayerSequence = (playerSequence, partialSequence, completeSequence) => dispatch => {
  if (playerSequence.length === APP.TOTAL_TURNS) {
    window.alert(NOTIFICATION.WINNER)
    dispatch({
      type: PLAYER_WINS
    })
  }

  if (playerSequence.length === partialSequence.length && playerSequence.length < APP.TOTAL_TURNS) {
    let updatedPartialOrder = completeSequence.slice(0, playerSequence.length + 1)

    dispatch({
      type: PLAYER_CONTINUES,
      payload: updatedPartialOrder
    })
  }
}
