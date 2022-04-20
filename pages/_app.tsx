import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // HOC Higher Order Component
    // wrap hole app in Context component
    <AuthProvider>
      {/* This is our whole App */}
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
