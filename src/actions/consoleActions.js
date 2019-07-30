import { CONSOLE } from 'appConstants'

const { START, RESTART, RUNNING } = CONSOLE

export const handleStart = () => {
  return {
    type: START,
    payload: RUNNING
  }
}

export const handleRestart = () => {
  return {
    type: RESTART,
    payload: RUNNING
  }
}
