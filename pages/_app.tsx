import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Head from 'next/head'
import { UserProvider } from '../hooks/useUserContext'
import { DarkModeProvider } from '../hooks/useDarkMode'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DarkModeProvider>
      <UserProvider>
        <Head>
          <title>GereClinicas - Sistema de Gestão Médica</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </UserProvider>
    </DarkModeProvider>
  )
}