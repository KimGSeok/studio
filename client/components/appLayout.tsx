import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

type AppLayoutProps = {
  children: React.ReactNode;  
}

const appLayout = ({ children }: AppLayoutProps) => {
  return(
    <>
      <Head>
        <title>Maison de Siri</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default appLayout;