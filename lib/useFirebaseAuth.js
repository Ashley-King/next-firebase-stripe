import { useState, useEffect } from 'react'
import firebase from '../firebase/firebaseClient'
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from 'firebase/auth'

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
})

const firebaseAuth = getAuth()

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null)
  const [loading, setloading] = useState(true)

  //change state of user and loading based on change of authUser state
  const authStateChanged = async (authUser) => {
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
   
    const unsubscribe = firebaseAuth.onAuthStateChanged(authStateChanged)
    return () => unsubscribe()
  } , [])

//clear state of authuser and set loading to true
  const clearAuthUser = () => {
    setAuthUser(null)
    setloading(true)
  }

  //function to sign in with email and password
  const signIn = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
  }

  //function to sign up with email and password
  const signUp = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password).then(userCrendentials => {
      return user
    }).catch(error => {
      return error
    })
  }

  //function to sign out
  const signOutUser = () => {
    signOut(firebaseAuth).then(clearAuthUser)
  }

  //return the auth user and loading state
  return {
    authUser,
    loading,
    signIn,
    signUp,
    signOutUser,
  }
}