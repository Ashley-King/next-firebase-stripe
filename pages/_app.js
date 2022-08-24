import 'bootstrap/dist/css/bootstrap.min.css'
import {AuthUserProvider} from '../context/authUserContext'

function MyApp({ Component, pageProps }) {
  return <AuthUserProvider><Component {...pageProps} /></AuthUserProvider>
}

export default MyApp
