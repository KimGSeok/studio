import { AppProps } from "next/app";
import AppLayout from "../components/AppLayout";
import { globalStyles } from '../styles/styles';

export default function MyApp({ Component, pageProps }:AppProps){
  return(
    <AppLayout>
      {globalStyles}
      <Component {...pageProps} />
    </AppLayout>
  )
}