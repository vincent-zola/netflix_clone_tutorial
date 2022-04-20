import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // HOC Higher Order Component
    // wrap hole app in Context component and Recoil
    <RecoilRoot>
      <AuthProvider>
        {/* This is our whole App */}
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  )
}

export default MyApp
