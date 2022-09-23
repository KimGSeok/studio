import { AppProps } from "next/app";
import { useRouter } from "next/router";
import AppLayout from "../components/AppLayout";
import { globalStyles } from '../styles/styles';
import wrapper from '../store/configureStore';
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps){

  // Hooks
  const router = useRouter();
  const firstPathName = router.pathname.split('/')[1]; // 1 Depth URL 주소

  return(
    <>
      <Head>
        <title>Maison de Siri</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
      </Head>
      {globalStyles}
      {
        (firstPathName === '/' || firstPathName === '') ? 
        // Main 페이지
        <Component {...pageProps}/>
        :
        // 이외 페이지
        <AppLayout
          firstPathName={firstPathName}
        >
          <Component {...pageProps}/>
        </AppLayout>
      }    
    </>
  )
}

export default wrapper.withRedux(MyApp);