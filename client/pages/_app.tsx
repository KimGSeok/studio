import { AppProps } from "next/app";
import AppLayout from "../components/AppLayout";
import { globalStyles } from '../styles/styles';
import wrapper from '../store/configureStore';

function MyApp({ Component, pageProps }:AppProps){
  return(
    <AppLayout>
      {globalStyles}
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default wrapper.withRedux(MyApp);