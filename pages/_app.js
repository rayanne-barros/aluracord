import Head from "next/head";
import GlobalStyle from "../src/GlobalStyle";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>BobDev</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="https://i.postimg.cc/TwH2PxCZ/imagempadrao.jpg" />
        <meta name="author" content="Rayanne Barros" />
        <meta httpEquiv="content-language" content="pt-BR" />

      </Head>
      <Component {...pageProps} />
    </>

  );
}
