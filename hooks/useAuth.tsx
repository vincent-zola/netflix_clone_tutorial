// * ========== Imports ==========

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

// * ========== TS Types ==========

// types for exported context
interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

interface AuthProviderProps {
  // React.ReactNode: type which describes everything contained in our App, is basically a wrapper for our App
  children: React.ReactNode
}

// *========== Variables & Functions ==========
// ? Why is he giving the values here? needs testing...
// create Context
const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

// this Fn. is a wrapper which will wrap our entire app, children are all components in our App
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // state to enable loading-screen in index.tsx
  const [loading, setLoading] = useState(false)
  // block the UI
  const [initialLoading, setInitialLoading] = useState(true)
  //* saves the user account from firebase, this is how out page knows if user is signed in or not
  //   User is a type from firebase
  const [user, setUser] = useState<User | null>(null)
  //! error state, we don't have one but for the future it can be implemented
  const [error, setError] = useState(null)
  // next js router, use it with router.push to redirect user to desired page
  const router = useRouter()

  //   ? check if user is logged in or not if auth changes
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {          
          // Logged in... nothing happens and we can navigate to any link
          setUser(user)
          setLoading(false)
        } else {
          // Not logged in... pushes us to login page
          setUser(null)
          setLoading(true)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )


  // * ===== Sign Up Fn. =====
  // Fn. to sign up new user with email and password
  const signUp = async (email: string, password: string) => {
    // activate loading
    setLoading(true)
    // create new user, with email, password with firebase
    await createUserWithEmailAndPassword(auth, email, password)
      .then(
        // then take what we got from the Fn. above and assign it to our setUser state
        (userCredentials) => {
          setUser(userCredentials.user)
          //   console.log(userCredentials);
          //   console.log(userCredentials.user);
          // push user to homepage
          router.push('/')
          // end loading
          setLoading(false)
        }
      )
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  // * ===== Sign In Fn. =====
  // Fn. to sign in user with email and password
  const signIn = async (email: string, password: string) => {
    // activate loading
    setLoading(true)
    // sign user, with email, password with firebase
    await signInWithEmailAndPassword(auth, email, password)
      .then(
        // then take what we got from the Fn. above and assign it to our setUser state
        (userCredentials) => {
          setUser(userCredentials.user)
          // push user to homepage
          router.push('/')
          // end loading
          setLoading(false)
        }
      )
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  // * ===== Logout Fn. =====

  const logout = async () => {
    setLoading(true)
    // signOut with firebase
    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  // * ========== Return Context ==========
  // useMemo will be executed if one of the states in the dependency array changes
  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      loading,
      logout,
      error,
    }),
    [user, loading, error]
  )
  // Basically returns our State to all of the children, all children will receive it because we wrapped our app in _app.tsx with this component
  return (
    // "!initialLoading &&" if is false show UI else block the whole UI but basically it redirects us to login as I understand...
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}



// ? I think this can be written shorter
export default function useAuth() {
  return useContext(AuthContext)
}
