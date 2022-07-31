import React from 'react';
import { useRouter } from "next/router";
import Header from './Header';
import Footer from './Footer';

type AppLayoutProps = {
  children: React.ReactNode;  
}

const AppLayout = ({ children }: AppLayoutProps) => {

  // Hooks
  const router = useRouter();
  const firstPathName = router.pathname.split('/')[1]; // 1 Depth URL 주소

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

export default AppLayout;