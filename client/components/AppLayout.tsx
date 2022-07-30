import React from 'react';
import { useRouter } from "next/router";
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

type AppLayoutProps = {
  children: React.ReactNode;  
}

const appLayout = ({ children }: AppLayoutProps) => {

  // Hooks
  const router = useRouter();
  const firstPathName = router.pathname.split('/')[1]; // 1 Depth URL 주소

  console.log(firstPathName);

  if(firstPathName === 'admin'){
    return(
      <>
        {children}
      </>
    )
  }else if(firstPathName === 'login'){
    return(
      <>
        {children}
      </>
    )
  }else{
    return(
      <>
        <Header />
        {children}
        <Footer />
      </>
    )
  }
}

export default appLayout;