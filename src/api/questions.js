import { firestore } from './firebase'

export const parseDoc = (doc) => {
  return Object.assign({
    id: ''
  }, {
    id: doc.id,
    ...doc.data()
  })
}

const buildPath = (userID, questionID = null) => {
  return `users/${userID}/questions${questionID ? `/${questionID}` : ''}`
}

export const get = async (userID, questionID) => {
  const doc = await firestore.doc(buildPath(userID, questionID)).get()
  return parseDoc(doc)
}

export const getByUserID = async (userID) => {
  const snapshot = await firestore.collection(buildPath(userID)).get()
  return snapshot.docs.map(doc => parseDoc(doc))
}

export const create = async (userID, data) => {
  const docRef = await firestore.collection(buildPath(userID)).add({
    createdAt: new Date(),
    ...data
  })
  const doc = await docRef.get()
  return parseDoc(doc)
}

export const update = async (userID, questionID, { id, ...data }) => {
  await firestore.doc(buildPath(userID, questionID, id)).update(data)
}

export const subscribe = (userID, addedCallback, modifiedCallback, removedCallback) => {
  const unsubscribe = firestore.collection(`users/${userID}/questions`).onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(function (change) {
      if (change.type === 'added') {
        addedCallback(parseDoc(change.doc))
      } else if (change.type === 'modified') {
        modifiedCallback(parseDoc(change.doc))
      } else if (change.type === 'removed') {
        removedCallback(parseDoc(change.doc))
      }
    })
  })

  return unsubscribe
}
