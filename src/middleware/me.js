// const unsubscribes = []

const me = store => next => action => {
  return next(action)
}

export default me
