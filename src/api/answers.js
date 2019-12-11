import { firestore } from './firebase'

export const parseDoc = (doc) => {
  return Object.assign({
    id: '',
    body: ''
  }, {
    id: doc.id,
    ...doc.data()
  })
}

const buildPath = (userID, questionID, answerID = null) => {
  return `users/${userID}/questions/${questionID}/answers${answerID ? `/${answerID}` : ''}`
}

export const get = async (userID, questionID, answerID) => {
  const doc = await firestore.doc(buildPath(userID, questionID, answerID)).get()
  return parseDoc(doc)
}

export const getByUserIDAndQuestionID = async (userID, questionID) => {
  const snapshot = await firestore.collection(buildPath(userID, questionID)).get()
  return snapshot.docs.map(doc => parseDoc(doc)) || []
}

export const create = async (userID, questionID, data) => {
  const docRef = await firestore.collection(buildPath(userID, questionID)).add({
    createdAt: new Date(),
    ...data
  })
  const doc = await docRef.get()
  return parseDoc(doc)
}

export const update = async (userID, questionID, { id, ...data }) => {
  await firestore.doc(buildPath(userID, questionID, id)).update(data)
}
