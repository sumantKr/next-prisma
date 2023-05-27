import { AppProps } from 'next/app'
import React from 'react'
import { SessionProvider } from "next-auth/react"

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App