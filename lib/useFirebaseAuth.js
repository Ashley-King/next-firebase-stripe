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
  return {
    authUser,
    loading,
  }
}