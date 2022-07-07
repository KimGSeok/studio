import React from 'react';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';

type AppLayoutProps = {
  children: React.ReactNode;  
}

export default function appLayout({ children }: AppLayoutProps){
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