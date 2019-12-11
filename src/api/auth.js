import { auth } from './firebase'

export const signIn = async (email, password) => {
  const userCredential = await auth.signInWithEmailAndPassword(email, password)

  return userCredential
}

export const signUp = async (email, password) => {
  const userCredential = await auth.createUserWithEmailAndPassword(email, password)

  return userCredential
}

export const signOut = async () => {
  auth.signOut()
}

export const onAuthStateChanged = callback => {
  auth.onAuthStateChanged(callback)
}
