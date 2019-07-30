import isEmpty from 'validate.io-empty'

export const setSequenceOfPlay = (pokemon, totalTurns) => {
  if (!pokemon || isEmpty(pokemon)) return ''
  let completeSequence = []
  // you can easily set up multiple option buttons with more totalTurns needed to win,
  // such as easy, difficult, impossible; or even let the user decide and have a number input
  for (let i = 0; i < totalTurns; i++) {
    // get random number between 0 - pokemon.length to choose a random pokemon from the fetched list
    const nextInSequence = Math.floor(Math.random() * pokemon.length)
    // set the order by poke name for easy referencing
    const selectedPoke = pokemon[nextInSequence].name
    completeSequence.push(selectedPoke)
  }

  return completeSequence
}
