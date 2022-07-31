import { AppProps } from "next/app";
import AppLayout from "../components/AppLayout";
import { globalStyles } from '../styles/styles';
import wrapper from '../store/configureStore';
import Head from "next/head";

function MyApp({ Component, pageProps }:AppProps){
  return(
    <>
      <Head>
        <title>Maison de Siri</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
      </Head>
      <AppLayout>
        {globalStyles}
        <Component {...pageProps} />
      </AppLayout>
    </>
  )
}

export default wrapper.withRedux(MyApp);