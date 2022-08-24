import { useState, useEffect } from 'react'
import firebase from '../firebase/firebaseClient'

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
})

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null)
  const [loading, setloading] = useState(true)

  //change state of user and loading based on change of authUser state
  const authStateChanged = async(authUser) => {
    if(!authUser) {
      setAuthUser(null)
      setloading(false)
      return
    }
    setloading(true)
    let formattedAuthUser = formatAuthUser(setAuthUser)
    setAuthUser(formattedAuthUser)
    setloading(false)
  }

  //listen for firebase auth state changes
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged)
    return () => unsubscribe()
  } , [])

//clear state of authuser and set loading to true
  const clearAuthUser = () => {
    setAuthUser(null)
    setloading(true)
  }

  //function to sign in with email and password
  const signInWithEmailAndPassword = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
  }

  //function to sign up with email and password
  const signUpWithEmailAndPassword = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  //function to sign out
  const signOut = () => {
    firebase.auth().signOut().then(clearAuthUser)
  }

  //return the auth user and loading state
  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    signOut,
  }
}