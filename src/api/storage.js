import { storage } from './firebase'

export const uploadQuestionImage = async (userID, questionID, image) => {
  const ref = storage.ref(`/${userID}/${questionID}.png`)
  await ref.put(image)
  await ref.getDownloadURL()
}

export const uploadAnswerImage = async (userID, questionID, answerID, image) => {
  const ref = storage.ref(`/${userID}/${questionID}/${answerID}.png`)
  await ref.put(image)
  await ref.getDownloadURL()
}
