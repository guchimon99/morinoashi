import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from '../config/firebase'

firebase.initializeApp(config)
firebase.analytics()

export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const auth = firebase.auth()

export default firebase
