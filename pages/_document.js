import Document, { Html, Head, Main, NextScript } from "next/document";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

class RucksaSite extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="X-UA-Compatible" content="IE=11" />
          <base href="/"></base>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <meta name="msapplication-TileColor" content="#fff" />

          <meta name="theme-color" content="#fff"></meta>
        </Head>
        <body className="authentication">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default RucksaSite;
