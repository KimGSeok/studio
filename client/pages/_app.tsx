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
      </Head>
      <AppLayout>
        {globalStyles}
        <Component {...pageProps} />
      </AppLayout>
    </>
  )
}

export default wrapper.withRedux(MyApp);