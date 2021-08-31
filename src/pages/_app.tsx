import "tailwindcss/tailwind.css";

import Head from "next/head";
import { AppProps } from "next/app";

import GlobalStyle from "src/styles/global";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>3D Studies</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  );
}

export default App;
