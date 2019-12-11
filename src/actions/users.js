export const update = (user) => ({
  type: 'USERS/UPDATE',
  payload: { user }
})

export const get = (id) => ({
  type: 'USERS/GET',
  payload: { id }
})

export const set = (user) => ({
  type: 'USERS/SET',
  payload: { user }
})

export const setList = (users) => ({
  type: 'USERS/SET_LIST',
  payload: { users }
})
