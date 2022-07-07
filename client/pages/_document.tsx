import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(){
    return(
      <Html lang="ko-kr">
        <Head>
          <meta name="copyright" content="Copyright ©Maison de Siri. All Rights Reserved." />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}