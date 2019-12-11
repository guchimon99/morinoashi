import { firestore } from './firebase'

export const parseDoc = (doc) => {
  return Object.assign({
    id: '',
    displayName: '',
    photoURL: ''
  }, {
    id: doc.id,
    ...doc.data()
  })
}

export const get = async (id) => {
  const doc = await firestore.doc(`users/${id}`).get()
  return parseDoc(doc)
}

export const create = async ({ id, ...data }) => {
  await firestore.doc(`users/${id}`).set({
    createdAt: new Date(),
    ...data
  })
}

export const update = async ({ id, ...data }) => {
  await firestore.doc(`users/${id}`).update(data)
}
