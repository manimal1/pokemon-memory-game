import { combineReducers } from 'redux'

import pokemonReducer from './pokemonReducer'
import consoleReducer from './consoleReducer'
import playReducer from './playReducer'
import notificaitonReducer from './notificationReducer'
import errorsReducer from './errorsReducer'

const rootReducer = combineReducers({
  pokemonData: pokemonReducer,
  gameConsole: consoleReducer,
  play: playReducer,
  notification: notificaitonReducer,
  error: errorsReducer
})

export default rootReducer
