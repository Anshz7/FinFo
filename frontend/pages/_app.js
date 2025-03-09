// pages/_app.js

import '../styles/globals.css'

// 1. Import the Font Awesome core
import { config } from '@fortawesome/fontawesome-svg-core'
// 2. Import the Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css'

// 3. Tell Font Awesome to skip adding the CSS automatically
config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
