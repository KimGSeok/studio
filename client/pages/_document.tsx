import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(){
    return(
      <Html lang="ko-kr">
        <Head>
          <title>Maison de Siri</title>
          <meta name="copyright" content="Copyright ©Maison de Siri. All Rights Reserved." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
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