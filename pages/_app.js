import '../styles/globals.css'
import { AppContextProvider } from './contexts/Context'
function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>

  )
}

export default MyApp
