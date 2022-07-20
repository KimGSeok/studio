import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(){
    return(
      <Html lang="ko-kr">
        <Head>
          <meta name="copyright" content="Copyright ©Maison de Siri. All Rights Reserved." />
          <script type="text/javascript" src='//dapi.kakao.com/v2/maps/sdk.js?appkey=53042f3b6b72738927f3ce3f779d2f99'></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}