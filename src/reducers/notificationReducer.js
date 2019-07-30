import { CONSOLE, NOTIFICATION, PLAY } from 'appConstants'

const {
  WELCOME,
  START,
  RESTART,
  WINNER,
  LOSER
} = NOTIFICATION

const initialState = {
  notificationLabel: WELCOME
}

const consoleReducer = (state = initialState, action) => {
  const { type } = action

  switch (type) {
    case CONSOLE.START:
      return {
        notificationLabel: START
      }

    case CONSOLE.RESTART:
      return {
        notificationLabel: RESTART
      }

    case PLAY.PLAYER_WINS:
      return {
        notificationLabel: WINNER
      }

    case PLAY.PLAYER_LOSES:
      return {
        notificationLabel: LOSER
      }

    default:
      return state
  }
}

export default consoleReducer
