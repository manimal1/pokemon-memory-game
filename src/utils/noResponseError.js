export const noResponseError = (err) => {
  return {
    status: 400,
    message: 'No response from Pokeapi. Is your endpoint correct?',
    response: err
  }
}
